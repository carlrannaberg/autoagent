window.BENCHMARK_DATA = {
  "lastUpdate": 1751644671999,
  "repoUrl": "https://github.com/carlrannaberg/autoagent",
  "entries": {
    "TypeScript Benchmarks": [
      {
        "commit": {
          "author": {
            "name": "Test User",
            "username": "bhanuprasad14",
            "email": "test@example.com"
          },
          "committer": {
            "name": "Test User",
            "username": "bhanuprasad14",
            "email": "test@example.com"
          },
          "id": "87a011cc03db76325743731d235684dad97a12d4",
          "message": "fix: Skip fetching gh-pages branch in benchmark workflow\n\nThe gh-pages branch doesn't exist yet, causing the workflow to fail.\nAdded skip-fetch-gh-pages: true to create the branch on first run.\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-04T15:53:16Z",
          "url": "https://github.com/carlrannaberg/autoagent/commit/87a011cc03db76325743731d235684dad97a12d4"
        },
        "date": 1751644671972,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 9862.18620588611,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10139739598540168,
              "min": 0.07569200000000365,
              "max": 1.5712369999999964,
              "p75": 0.10816399999998794,
              "p99": 0.16388800000004267,
              "p995": 0.19273299999997562,
              "p999": 0.46532600000000457
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10705.279234959651,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09341185578180475,
              "min": 0.07408000000009451,
              "max": 0.4299189999999271,
              "p75": 0.10391599999979917,
              "p99": 0.1374479999999494,
              "p995": 0.14916100000004917,
              "p999": 0.35690199999999095
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 9238.791665247969,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10823926290724081,
              "min": 0.07515199999988909,
              "max": 2.9628780000002735,
              "p75": 0.11772100000007413,
              "p99": 0.15148499999986598,
              "p995": 0.16472999999996318,
              "p999": 0.4360910000000331
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9602.63951723831,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10413803394419172,
              "min": 0.07618599999932485,
              "max": 0.5470510000000104,
              "p75": 0.11124699999982113,
              "p99": 0.1482850000002145,
              "p995": 0.16390000000001237,
              "p999": 0.41367300000001705
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6724.503878581061,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14870985548617308,
              "min": 0.13821099999995567,
              "max": 0.5519389999999476,
              "p75": 0.15175599999997758,
              "p99": 0.26658199999997123,
              "p995": 0.35302599999999984,
              "p999": 0.5053119999999467
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.00868892012182,
            "unit": "ops/s",
            "extra": {
              "mean": 71.38426770000001,
              "min": 68.62293799999998,
              "max": 75.61169599999994,
              "p75": 71.89547900000002,
              "p99": 75.61169599999994,
              "p995": 75.61169599999994,
              "p999": 75.61169599999994
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1717.0680681742642,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5823880942956948,
              "min": 0.34736400000019785,
              "max": 2.355023000000074,
              "p75": 0.6355859999998756,
              "p99": 1.3692550000000665,
              "p995": 1.516193999999814,
              "p999": 2.355023000000074
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 729.983246884485,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3698944520547927,
              "min": 1.0256609999999,
              "max": 5.996377000000166,
              "p75": 1.5779210000000603,
              "p99": 2.598391999999876,
              "p995": 4.52844499999992,
              "p999": 5.996377000000166
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 900408.0443137441,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011106075809908618,
              "min": 0.0010219999999208085,
              "max": 0.0489629999999579,
              "p75": 0.0011120000001483277,
              "p99": 0.0011819999999715947,
              "p995": 0.001222000000097978,
              "p999": 0.009648000000197499
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 519183.3634811818,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019261017789454762,
              "min": 0.0017629999999826396,
              "max": 0.33711499999998296,
              "p75": 0.0018730000000459768,
              "p99": 0.003597000000013395,
              "p995": 0.003937000000064472,
              "p999": 0.0119520000000648
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1908078.0651879453,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005240875718056641,
              "min": 0.0004999999946448952,
              "max": 2.494505000009667,
              "p75": 0.0005110000056447461,
              "p99": 0.0005810000002384186,
              "p995": 0.0008419999940088019,
              "p999": 0.0010120000079041347
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1411640.2834289758,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007083957660735836,
              "min": 0.0006609999982174486,
              "max": 0.3372910000034608,
              "p75": 0.0006819999980507419,
              "p99": 0.0008209999941755086,
              "p995": 0.0009219999919878319,
              "p999": 0.001452000011340715
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 293996.2136789999,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034014043496895206,
              "min": 0.003235000003769528,
              "max": 0.03145799999765586,
              "p75": 0.0033859999966807663,
              "p99": 0.0036770000006072223,
              "p995": 0.005981000002066139,
              "p999": 0.012273000000277534
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 291301.88581086416,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034328648344188126,
              "min": 0.0032359999968321063,
              "max": 0.17682999999669846,
              "p75": 0.0033870000042952597,
              "p99": 0.004337999998824671,
              "p995": 0.006031000004441012,
              "p999": 0.013435000000754371
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41505.83762903575,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024092996482510252,
              "min": 0.022863000005600043,
              "max": 2.5769580000051064,
              "p75": 0.023673999996390194,
              "p99": 0.03463500000361819,
              "p995": 0.0400039999949513,
              "p999": 0.04619599999568891
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 13463.45496473877,
            "unit": "ops/s",
            "extra": {
              "mean": 0.07427513982250714,
              "min": 0.07134300000325311,
              "max": 0.40918499999679625,
              "p75": 0.07334699999773875,
              "p99": 0.08504900000116322,
              "p995": 0.09649099998932797,
              "p999": 0.24579000000085216
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9991136977285522,
            "unit": "ops/s",
            "extra": {
              "mean": 1000.8870885000003,
              "min": 999.9259790000006,
              "max": 1001.8343420000001,
              "p75": 1001.6579920000004,
              "p99": 1001.8343420000001,
              "p995": 1001.8343420000001,
              "p999": 1001.8343420000001
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33287924515427575,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.092368499999,
              "min": 3003.326117999997,
              "max": 3004.6945080000005,
              "p75": 3004.4854479999995,
              "p99": 3004.6945080000005,
              "p995": 3004.6945080000005,
              "p999": 3004.6945080000005
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.141541016023977,
            "unit": "ops/s",
            "extra": {
              "mean": 98.60434409523822,
              "min": 96.876648999998,
              "max": 99.73230999999942,
              "p75": 99.1275089999981,
              "p99": 99.73230999999942,
              "p995": 99.73230999999942,
              "p999": 99.73230999999942
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2522562.4965528995,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00039642228938490423,
              "min": 0.0003100000000131331,
              "max": 1.231632999999988,
              "p75": 0.0003609999999980573,
              "p99": 0.000862000000097396,
              "p995": 0.0014830000000074506,
              "p999": 0.0023640000000000327
            }
          }
        ]
      }
    ]
  }
}