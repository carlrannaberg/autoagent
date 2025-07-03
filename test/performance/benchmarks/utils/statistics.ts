/**
 * Statistical analysis utilities for benchmark results
 */

export interface StatisticalSummary {
  count: number;
  mean: number;
  median: number;
  mode: number[];
  range: number;
  variance: number;
  standardDeviation: number;
  standardError: number;
  confidenceInterval95: [number, number];
  outliers: number[];
  skewness: number;
  kurtosis: number;
  coefficientOfVariation: number;
}

export interface TrendAnalysis {
  slope: number;
  correlation: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  changeRate: number; // percentage change per sample
}

export interface ComparisonTest {
  tStatistic: number;
  pValue: number;
  significant: boolean;
  effectSize: number; // Cohen's d
  interpretation: 'negligible' | 'small' | 'medium' | 'large';
}

/**
 * Calculate comprehensive statistical summary for a dataset
 */
export function calculateStatistics(values: number[]): StatisticalSummary {
  if (values.length === 0) {
    throw new Error('Cannot calculate statistics for empty dataset');
  }

  const sorted = [...values].sort((a, b) => a - b);
  const n = values.length;
  
  // Basic measures
  const mean = values.reduce((sum, val) => sum + val, 0) / n;
  const median = n % 2 === 0 
    ? (sorted[n/2 - 1] + sorted[n/2]) / 2 
    : sorted[Math.floor(n/2)];
  
  // Mode calculation
  const frequency = new Map<number, number>();
  values.forEach(val => frequency.set(val, (frequency.get(val) ?? 0) + 1));
  const maxFreq = Math.max(...frequency.values());
  const mode = Array.from(frequency.entries())
    .filter(([_, freq]) => freq === maxFreq)
    .map(([val, _]) => val);

  // Variance and standard deviation
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (n - 1);
  const standardDeviation = Math.sqrt(variance);
  const standardError = standardDeviation / Math.sqrt(n);

  // 95% confidence interval
  const tCritical = getTCritical(n - 1, 0.05); // t-value for 95% CI
  const marginOfError = tCritical * standardError;
  const confidenceInterval95: [number, number] = [mean - marginOfError, mean + marginOfError];

  // Outlier detection using IQR method
  const q1 = percentile(sorted, 25);
  const q3 = percentile(sorted, 75);
  const iqr = q3 - q1;
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;
  const outliers = values.filter(val => val < lowerBound || val > upperBound);

  // Skewness and kurtosis
  const skewness = calculateSkewness(values, mean, standardDeviation);
  const kurtosis = calculateKurtosis(values, mean, standardDeviation);

  // Coefficient of variation
  const coefficientOfVariation = (standardDeviation / mean) * 100;

  return {
    count: n,
    mean,
    median,
    mode,
    range: Math.max(...values) - Math.min(...values),
    variance,
    standardDeviation,
    standardError,
    confidenceInterval95,
    outliers,
    skewness,
    kurtosis,
    coefficientOfVariation
  };
}

/**
 * Analyze trends in time series data
 */
export function analyzeTrend(values: number[]): TrendAnalysis {
  const n = values.length;
  const x = Array.from({ length: n }, (_, i) => i);
  
  // Linear regression
  const meanX = x.reduce((sum, val) => sum + val, 0) / n;
  const meanY = values.reduce((sum, val) => sum + val, 0) / n;
  
  const numerator = x.reduce((sum, xi, i) => sum + (xi - meanX) * (values[i] - meanY), 0);
  const denominator = x.reduce((sum, xi) => sum + Math.pow(xi - meanX, 2), 0);
  
  const slope = numerator / denominator;
  
  // Correlation coefficient
  const correlation = numerator / Math.sqrt(
    denominator * values.reduce((sum, yi) => sum + Math.pow(yi - meanY, 2), 0)
  );
  
  // Determine trend
  let trend: 'increasing' | 'decreasing' | 'stable';
  if (Math.abs(slope) < 0.01) {
    trend = 'stable';
  } else if (slope > 0) {
    trend = 'increasing';
  } else {
    trend = 'decreasing';
  }
  
  // Change rate as percentage
  const changeRate = (slope / meanY) * 100;
  
  return {
    slope,
    correlation,
    trend,
    changeRate
  };
}

/**
 * Perform statistical comparison between two datasets
 */
export function compareDatasets(baseline: number[], current: number[]): ComparisonTest {
  const stats1 = calculateStatistics(baseline);
  const stats2 = calculateStatistics(current);
  
  // Welch's t-test (unequal variances)
  const pooledSE = Math.sqrt(
    (stats1.variance / stats1.count) + (stats2.variance / stats2.count)
  );
  
  const tStatistic = (stats2.mean - stats1.mean) / pooledSE;
  
  // Degrees of freedom (Welch-Satterthwaite equation)
  const _df = Math.pow(
    (stats1.variance / stats1.count) + (stats2.variance / stats2.count), 2
  ) / (
    Math.pow(stats1.variance / stats1.count, 2) / (stats1.count - 1) +
    Math.pow(stats2.variance / stats2.count, 2) / (stats2.count - 1)
  );
  
  // Approximate p-value (simplified)
  const pValue = 2 * (1 - normalCDF(Math.abs(tStatistic)));
  const significant = pValue < 0.05;
  
  // Effect size (Cohen's d)
  const pooledSD = Math.sqrt(
    ((stats1.count - 1) * stats1.variance + (stats2.count - 1) * stats2.variance) /
    (stats1.count + stats2.count - 2)
  );
  const effectSize = (stats2.mean - stats1.mean) / pooledSD;
  
  // Interpret effect size
  let interpretation: 'negligible' | 'small' | 'medium' | 'large';
  const absEffect = Math.abs(effectSize);
  if (absEffect < 0.2) {
    interpretation = 'negligible';
  } else if (absEffect < 0.5) {
    interpretation = 'small';
  } else if (absEffect < 0.8) {
    interpretation = 'medium';
  } else {
    interpretation = 'large';
  }
  
  return {
    tStatistic,
    pValue,
    significant,
    effectSize,
    interpretation
  };
}

/**
 * Calculate percentile value
 */
export function percentile(sortedValues: number[], p: number): number {
  const index = (p / 100) * (sortedValues.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index - lower;
  
  if (lower === upper) {
    return sortedValues[lower];
  }
  
  return sortedValues[lower] * (1 - weight) + sortedValues[upper] * weight;
}

/**
 * Calculate skewness
 */
function calculateSkewness(values: number[], mean: number, stdDev: number): number {
  const n = values.length;
  const moment3 = values.reduce((sum, val) => sum + Math.pow((val - mean) / stdDev, 3), 0) / n;
  return moment3;
}

/**
 * Calculate kurtosis
 */
function calculateKurtosis(values: number[], mean: number, stdDev: number): number {
  const n = values.length;
  const moment4 = values.reduce((sum, val) => sum + Math.pow((val - mean) / stdDev, 4), 0) / n;
  return moment4 - 3; // Excess kurtosis
}

/**
 * Get t-critical value (simplified approximation)
 */
function getTCritical(df: number, _alpha: number): number {
  // Simplified approximation for t-critical values
  // In practice, would use a proper t-distribution table
  if (df >= 30) {return 1.96;} // z-critical for large samples
  if (df >= 20) {return 2.086;}
  if (df >= 10) {return 2.228;}
  return 2.571; // Conservative estimate for small samples
}

/**
 * Cumulative distribution function for standard normal distribution
 */
function normalCDF(x: number): number {
  // Approximation using error function
  return 0.5 * (1 + erf(x / Math.sqrt(2)));
}

/**
 * Error function approximation
 */
function erf(x: number): number {
  // Abramowitz and Stegun approximation
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;

  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
}

/**
 * Generate a statistical report
 */
export function generateStatisticalReport(
  data: { name: string; values: number[] }[],
  options: { includeRawData?: boolean } = {}
): string {
  const lines: string[] = [
    '# Statistical Analysis Report',
    '',
    `Generated: ${new Date().toISOString()}`,
    `Datasets analyzed: ${data.length}`,
    ''
  ];

  for (const dataset of data) {
    const stats = calculateStatistics(dataset.values);
    const trend = dataset.values.length > 2 ? analyzeTrend(dataset.values) : null;

    lines.push(`## ${dataset.name}`, '');
    lines.push(`**Sample size:** ${stats.count}`);
    lines.push(`**Mean:** ${stats.mean.toFixed(3)} ± ${stats.standardError.toFixed(3)}`);
    lines.push(`**Median:** ${stats.median.toFixed(3)}`);
    lines.push(`**Standard Deviation:** ${stats.standardDeviation.toFixed(3)}`);
    lines.push(`**95% Confidence Interval:** [${stats.confidenceInterval95[0].toFixed(3)}, ${stats.confidenceInterval95[1].toFixed(3)}]`);
    lines.push(`**Coefficient of Variation:** ${stats.coefficientOfVariation.toFixed(1)}%`);
    
    if (stats.outliers.length > 0) {
      lines.push(`**Outliers detected:** ${stats.outliers.length} (${(stats.outliers.length / stats.count * 100).toFixed(1)}%)`);
    }

    if (trend) {
      lines.push(`**Trend:** ${trend.trend} (${trend.changeRate > 0 ? '+' : ''}${trend.changeRate.toFixed(2)}% per sample)`);
      lines.push(`**Correlation:** ${trend.correlation.toFixed(3)}`);
    }

    // Distribution shape
    let skewnessDesc = 'symmetric';
    if (Math.abs(stats.skewness) > 0.5) {
      skewnessDesc = stats.skewness > 0 ? 'right-skewed' : 'left-skewed';
    }
    lines.push(`**Distribution:** ${skewnessDesc}`);

    if (options.includeRawData) {
      lines.push(`**Raw data:** ${dataset.values.map(v => v.toFixed(3)).join(', ')}`);
    }

    lines.push('');
  }

  return lines.join('\n');
}