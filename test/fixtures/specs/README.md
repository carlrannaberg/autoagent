# Test Specification Files

This directory contains sample specification files used for integration testing of the reflection system.

## Files

### Complex Specifications
- **e-commerce-platform.md** - Comprehensive e-commerce system with multiple components
- **authentication-system.md** - Detailed auth/authz system with security requirements
- **data-analytics-platform.md** - Large-scale data processing and analytics platform

### Medium Complexity
- **simple-todo-app.md** - Basic todo application with standard features

### Minimal Specifications
- **minimal-button.md** - Extremely simple spec for testing skip logic

## Usage

These specifications are used in integration tests to verify:
- Reflection system behavior with different complexity levels
- Provider response handling
- Improvement application
- Configuration options (e.g., skipForSimpleSpecs)

## Characteristics

### Complex Specs (>1000 words)
- Multiple interconnected components
- Detailed technical requirements
- Performance and security considerations
- Integration requirements
- Phased implementation approach

### Simple Specs (<500 words)
- Basic feature descriptions
- Minimal technical details
- Suitable for testing reflection skip logic

## Testing Scenarios

1. **Full Reflection Cycle**
   - Use complex specs to test multiple iteration scenarios
   - Verify improvement identification and application

2. **Skip Logic**
   - Use minimal specs to test skipForSimpleSpecs configuration
   - Ensure reflection is bypassed for simple specifications

3. **Provider Compatibility**
   - Test how different providers handle various spec complexities
   - Verify consistent behavior across Claude and Gemini

4. **Performance Testing**
   - Use data-analytics-platform.md for stress testing
   - Measure reflection performance with large specifications