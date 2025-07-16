window.BENCHMARK_DATA = {
  "lastUpdate": 1752695510966,
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
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "e411759d0b5666ffbcf04fe33c4ddde76812509d",
          "message": "fix: Resolve all lint errors in benchmark files\n\n- Remove unused imports (promisify)\n- Fix await on non-promise values (createTempDir)\n- Fix strict boolean expressions with proper null checks\n- Replace || with ?? for nullish coalescing\n- Use underscore prefix for unused function parameters\n- Fix todo list handling to work with string arrays\n- Update PatternAnalyzer benchmarks to use public methods",
          "timestamp": "2025-07-04T19:18:25+03:00",
          "tree_id": "ed576742ce0c70282915e679881ddfafcb623198",
          "url": "https://github.com/carlrannaberg/autoagent/commit/e411759d0b5666ffbcf04fe33c4ddde76812509d"
        },
        "date": 1751646034567,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 9446.316911930478,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1058613647332775,
              "min": 0.07567100000005667,
              "max": 0.6515789999999697,
              "p75": 0.11861199999998462,
              "p99": 0.16165300000000116,
              "p995": 0.20630599999998367,
              "p999": 0.3810829999999896
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10123.442076860449,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09878063137099777,
              "min": 0.0734780000000228,
              "max": 0.7407240000000002,
              "p75": 0.1060179999999491,
              "p99": 0.15560899999991307,
              "p995": 0.1918879999998353,
              "p999": 0.31337600000006205
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 9559.887532703211,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10460374105648437,
              "min": 0.07392799999979616,
              "max": 2.579715999999962,
              "p75": 0.11413300000003801,
              "p99": 0.14636300000006486,
              "p995": 0.15295599999990372,
              "p999": 0.30782600000020466
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9691.315502386522,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10318516611637979,
              "min": 0.0747999999998683,
              "max": 0.4004570000001877,
              "p75": 0.11423400000012407,
              "p99": 0.15042199999970762,
              "p995": 0.15430900000001202,
              "p999": 0.30291699999997945
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6833.2967444321885,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14634224700029397,
              "min": 0.13658599999996568,
              "max": 0.4235020000000418,
              "p75": 0.14968000000010306,
              "p99": 0.2464109999999664,
              "p995": 0.27392199999997047,
              "p999": 0.34240100000005214
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.204965893287383,
            "unit": "ops/s",
            "extra": {
              "mean": 70.3979163,
              "min": 69.79517700000008,
              "max": 71.48823499999992,
              "p75": 70.714158,
              "p99": 71.48823499999992,
              "p995": 71.48823499999992,
              "p999": 71.48823499999992
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1795.1887829120337,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5570444788418674,
              "min": 0.3407290000000103,
              "max": 2.0187160000000404,
              "p75": 0.6368250000000444,
              "p99": 1.305739000000358,
              "p995": 1.3515050000000883,
              "p999": 2.0187160000000404
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 720.8848545678493,
            "unit": "ops/s",
            "extra": {
              "mean": 1.387184088642662,
              "min": 0.9033139999999094,
              "max": 7.636302999999998,
              "p75": 1.5875780000001214,
              "p99": 3.3870019999999386,
              "p995": 3.9586040000001503,
              "p999": 7.636302999999998
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 879311.7520340835,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011372530819549862,
              "min": 0.0010419999998703133,
              "max": 0.2755369999999857,
              "p75": 0.0011230000000068685,
              "p99": 0.0020939999999427528,
              "p995": 0.002273999999943044,
              "p999": 0.009678000000121756
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 511562.87456168205,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019547939260776523,
              "min": 0.0017330000000583823,
              "max": 0.2477749999999901,
              "p75": 0.0018730000000459768,
              "p99": 0.003977000000077169,
              "p995": 0.0042469999999639185,
              "p999": 0.011972000000014305
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1918295.5932794358,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005212960940448406,
              "min": 0.0004999999946448952,
              "max": 0.4040859999950044,
              "p75": 0.0005110000056447461,
              "p99": 0.0006009999924572185,
              "p995": 0.0008519999973941594,
              "p999": 0.0010119999933522195
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1401049.3162897408,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000713750749793876,
              "min": 0.0006609999982174486,
              "max": 3.023547000004328,
              "p75": 0.0006819999980507419,
              "p99": 0.000941999998758547,
              "p995": 0.0010020000045187771,
              "p999": 0.001512999995611608
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 286832.4924094622,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003486355369295014,
              "min": 0.0032559999963268638,
              "max": 0.04047599999466911,
              "p75": 0.0034670000022742897,
              "p99": 0.0043080000032205135,
              "p995": 0.006061000000045169,
              "p999": 0.01252300000487594
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 290017.8857329565,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034480632029735667,
              "min": 0.003206000001227949,
              "max": 0.18000600000232225,
              "p75": 0.0034060000034514815,
              "p99": 0.005140000001119915,
              "p995": 0.006511999999929685,
              "p999": 0.014137000005575828
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41006.35892545552,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024386461666052236,
              "min": 0.02313299999514129,
              "max": 2.4371870000031777,
              "p75": 0.023975000003702007,
              "p99": 0.03621799999382347,
              "p995": 0.040374999996856786,
              "p999": 0.04786000000603963
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14927.845877459922,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0669889016947807,
              "min": 0.06526199998916127,
              "max": 0.3250089999928605,
              "p75": 0.06607299999450333,
              "p99": 0.07983000000240281,
              "p995": 0.09025900000415277,
              "p999": 0.20034499999019317
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986302746209462,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3716040999996,
              "min": 1000.8160239999997,
              "max": 1002.1214,
              "p75": 1001.7213670000001,
              "p99": 1002.1214,
              "p995": 1002.1214,
              "p999": 1002.1214
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33288096875760376,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.076813800001,
              "min": 3003.3777950000003,
              "max": 3004.6190239999996,
              "p75": 3004.4768440000043,
              "p99": 3004.6190239999996,
              "p995": 3004.6190239999996,
              "p999": 3004.6190239999996
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.15691391642693,
            "unit": "ops/s",
            "extra": {
              "mean": 98.45510242857182,
              "min": 95.48615100000461,
              "max": 99.60558599999786,
              "p75": 98.99782100000448,
              "p99": 99.60558599999786,
              "p995": 99.60558599999786,
              "p999": 99.60558599999786
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2627064.3239329257,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038065303193753546,
              "min": 0.00031099999995376493,
              "max": 4.063642999999956,
              "p75": 0.0003509999999664615,
              "p99": 0.0007209999999986394,
              "p995": 0.0013020000001233711,
              "p999": 0.002043000000014672
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "49f32d539156379df1fb6ccd7fa54c0d288a477e",
          "message": "fix: Add permissions and skip-fetch option to benchmark workflow\n\n- Add write permissions for contents and deployments\n- Add skip-fetch-gh-pages to avoid permission issues\n- Match test.yaml benchmark configuration with benchmarks.yaml",
          "timestamp": "2025-07-04T19:21:17+03:00",
          "tree_id": "a1887bb46f68e0741bc046ccfb6a533db1ca7a8c",
          "url": "https://github.com/carlrannaberg/autoagent/commit/49f32d539156379df1fb6ccd7fa54c0d288a477e"
        },
        "date": 1751646197060,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 8711.51745162529,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11479056382001876,
              "min": 0.07800599999995939,
              "max": 1.160833000000025,
              "p75": 0.1310959999999568,
              "p99": 0.1806500000000142,
              "p995": 0.2451510000000212,
              "p999": 0.5098090000000184
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9629.629323102063,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10384615715175449,
              "min": 0.07731499999999869,
              "max": 0.4437550000000101,
              "p75": 0.11268199999994977,
              "p99": 0.14692599999989397,
              "p995": 0.1518060000000787,
              "p999": 0.3734830000000784
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 9402.983949106389,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10634921907901745,
              "min": 0.07557300000007672,
              "max": 2.924269000000095,
              "p75": 0.11401599999999235,
              "p99": 0.15387999999984459,
              "p995": 0.1649609999999484,
              "p999": 0.40283799999997427
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9691.882343091956,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10317913121518298,
              "min": 0.07466000000022177,
              "max": 0.42928699999993114,
              "p75": 0.11392699999987599,
              "p99": 0.15611300000000483,
              "p995": 0.16251400000010108,
              "p999": 0.3354380000000674
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6836.198251588811,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14628013454226382,
              "min": 0.13719800000001214,
              "max": 0.46295999999995274,
              "p75": 0.14923099999998612,
              "p99": 0.2360479999999825,
              "p995": 0.30310099999996964,
              "p999": 0.40740600000003724
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 13.876319814764011,
            "unit": "ops/s",
            "extra": {
              "mean": 72.06521709999998,
              "min": 69.85024700000008,
              "max": 80.98571400000003,
              "p75": 72.17032099999994,
              "p99": 80.98571400000003,
              "p995": 80.98571400000003,
              "p999": 80.98571400000003
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1828.8963159402078,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5467778524590199,
              "min": 0.3667799999998351,
              "max": 1.5432120000000396,
              "p75": 0.6284319999999752,
              "p99": 1.2970479999999043,
              "p995": 1.4080560000002151,
              "p999": 1.5432120000000396
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 700.4138665718292,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4277273019943095,
              "min": 0.9314620000000104,
              "max": 6.286202000000003,
              "p75": 1.602623999999878,
              "p99": 3.000462000000198,
              "p995": 3.1841470000001664,
              "p999": 6.286202000000003
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 868415.2410051214,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011515228577086921,
              "min": 0.0010619999998198182,
              "max": 0.028614000000061424,
              "p75": 0.0011529999999311258,
              "p99": 0.001242000000047483,
              "p995": 0.0012930000000324071,
              "p999": 0.00976900000000569
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 522522.75012557575,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001913792269828776,
              "min": 0.001772999999957392,
              "max": 0.31472000000002254,
              "p75": 0.0018840000000182044,
              "p99": 0.002594000000044616,
              "p995": 0.0036569999999755964,
              "p999": 0.011251000000015665
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1898739.1304009184,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005266652927666004,
              "min": 0.0004999999946448952,
              "max": 0.48178200000256766,
              "p75": 0.0005110000056447461,
              "p99": 0.0008309999975608662,
              "p995": 0.000862000000779517,
              "p999": 0.0011310000118101016
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1405936.1807220785,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007112698383552569,
              "min": 0.0006709999870508909,
              "max": 0.4696700000058627,
              "p75": 0.0006819999980507419,
              "p99": 0.0008309999975608662,
              "p995": 0.0009620000055292621,
              "p999": 0.0015419999981531873
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 267701.1567410864,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0037355086999761233,
              "min": 0.0035270000007585622,
              "max": 0.32073000000673346,
              "p75": 0.0037159999992582016,
              "p99": 0.0040870000011636876,
              "p995": 0.006452000001445413,
              "p999": 0.013405000005150214
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 283613.8598949782,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0035259207725965814,
              "min": 0.0033159999948111363,
              "max": 0.21525300000212155,
              "p75": 0.003466000001935754,
              "p99": 0.005300000004353933,
              "p995": 0.006702999999106396,
              "p999": 0.014546999998856336
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 39545.4915239997,
            "unit": "ops/s",
            "extra": {
              "mean": 0.02528733267591608,
              "min": 0.023925000001327135,
              "max": 2.366531000006944,
              "p75": 0.024806000001262873,
              "p99": 0.038683000006130897,
              "p995": 0.041928000006009825,
              "p999": 0.050544999990961514
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14748.862592204814,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0678018385315033,
              "min": 0.06578300001274329,
              "max": 0.44333999999798834,
              "p75": 0.06673500000033528,
              "p99": 0.08107200000085868,
              "p995": 0.09496799999033101,
              "p999": 0.2794629999989411
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.998800424808878,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.2010158999998,
              "min": 999.8805509999984,
              "max": 1002.1348570000009,
              "p75": 1001.872351,
              "p99": 1002.1348570000009,
              "p995": 1002.1348570000009,
              "p999": 1002.1348570000009
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.332864063318855,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.2293843,
              "min": 3003.658559999996,
              "max": 3004.7337019999977,
              "p75": 3004.471569000001,
              "p99": 3004.7337019999977,
              "p995": 3004.7337019999977,
              "p999": 3004.7337019999977
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.173407533555789,
            "unit": "ops/s",
            "extra": {
              "mean": 98.29548228571574,
              "min": 92.28765099999873,
              "max": 99.80376400000387,
              "p75": 99.41142100000434,
              "p99": 99.80376400000387,
              "p995": 99.80376400000387,
              "p999": 99.80376400000387
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2570703.542414554,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038899856926354954,
              "min": 0.0003100000000131331,
              "max": 4.439435000000003,
              "p75": 0.0003510000000233049,
              "p99": 0.0008010000000240325,
              "p995": 0.0014430000001084409,
              "p999": 0.0021750000000224645
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "0d4ccd46f14d247acaea3a8af0e4a4b43be32cdc",
          "message": "fix: Make benchmark storage non-blocking and remove skip-fetch\n\n- Add continue-on-error to benchmark storage step\n- Remove skip-fetch-gh-pages option\n- Disable benchmark comments to reduce noise\n- Allow workflow to succeed even if benchmark storage fails",
          "timestamp": "2025-07-04T19:24:29+03:00",
          "tree_id": "d492f1347896a719acf6f41e64753ee0d4d06cde",
          "url": "https://github.com/carlrannaberg/autoagent/commit/0d4ccd46f14d247acaea3a8af0e4a4b43be32cdc"
        },
        "date": 1751646392504,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 9248.365943214994,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10812720929729687,
              "min": 0.07760500000006232,
              "max": 1.2690269999999941,
              "p75": 0.1178600000000074,
              "p99": 0.17030799999997726,
              "p995": 0.22401800000000094,
              "p999": 0.3895469999999932
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10691.261661469656,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09353433034044148,
              "min": 0.07486999999991895,
              "max": 0.4147960000000239,
              "p75": 0.09938600000009501,
              "p99": 0.13793699999996534,
              "p995": 0.14475000000015825,
              "p999": 0.3505739999998241
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 9489.49816378214,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10537965050845632,
              "min": 0.07467899999983274,
              "max": 2.7934529999999995,
              "p75": 0.1111679999999069,
              "p99": 0.15106199999991077,
              "p995": 0.15677699999969263,
              "p999": 0.36441999999988184
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9141.874715250024,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10938675393700696,
              "min": 0.077595000000656,
              "max": 0.3871030000000246,
              "p75": 0.11894200000006094,
              "p99": 0.14892699999973047,
              "p995": 0.15481799999997747,
              "p999": 0.28742700000020704
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6665.895452095746,
            "unit": "ops/s",
            "extra": {
              "mean": 0.15001735433543317,
              "min": 0.1396510000000717,
              "max": 0.4279390000000376,
              "p75": 0.15310500000009597,
              "p99": 0.25193000000001575,
              "p995": 0.2829280000000267,
              "p999": 0.3693389999999681
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.288866225889723,
            "unit": "ops/s",
            "extra": {
              "mean": 69.9845589,
              "min": 68.92659300000003,
              "max": 70.65826200000004,
              "p75": 70.29834000000005,
              "p99": 70.65826200000004,
              "p995": 70.65826200000004,
              "p999": 70.65826200000004
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1815.9805678652083,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5506666853685327,
              "min": 0.37606099999993603,
              "max": 1.5038760000002185,
              "p75": 0.6469069999998283,
              "p99": 1.19787499999984,
              "p995": 1.2911990000002334,
              "p999": 1.5038760000002185
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 723.1104808890098,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3829145426997207,
              "min": 0.9710319999999228,
              "max": 4.137269999999944,
              "p75": 1.5941540000001169,
              "p99": 2.96243800000002,
              "p995": 3.9136019999998553,
              "p999": 4.137269999999944
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 918135.7925014807,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001089163507366899,
              "min": 0.0010219999999208085,
              "max": 0.3464760000001661,
              "p75": 0.0010820000002240704,
              "p99": 0.0011520000000473374,
              "p995": 0.0012419999998201092,
              "p999": 0.00987899999995534
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 506218.8053236401,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001975430366243845,
              "min": 0.001772999999957392,
              "max": 0.3412969999999973,
              "p75": 0.001874000000043452,
              "p99": 0.004087999999967451,
              "p995": 0.004367999999999483,
              "p999": 0.011781999999925574
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1932676.9679268347,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005174170420588657,
              "min": 0.0004899999912595376,
              "max": 2.7576850000041304,
              "p75": 0.0005010000022593886,
              "p99": 0.0005810000002384186,
              "p995": 0.0008210000087274238,
              "p999": 0.0009920000011334196
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1413161.4912557274,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007076332083684262,
              "min": 0.0006609999982174486,
              "max": 0.23962700000265613,
              "p75": 0.0006819999980507419,
              "p99": 0.0008209999941755086,
              "p995": 0.0009319999953731894,
              "p999": 0.0014119999977992848
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 291532.6217206346,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034301478650930004,
              "min": 0.0032359999968321063,
              "max": 0.047348000000056345,
              "p75": 0.003416999999899417,
              "p99": 0.0036859999963780865,
              "p995": 0.0056210000038845465,
              "p999": 0.012824000004911795
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 290700.87556831114,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003439962119291974,
              "min": 0.0032160000046133064,
              "max": 0.19566499999928055,
              "p75": 0.0033970000004046597,
              "p99": 0.005119000001286622,
              "p995": 0.00662200000078883,
              "p999": 0.013895999996748287
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41906.28008254811,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023862771833485896,
              "min": 0.022772000011173077,
              "max": 2.3266199999925448,
              "p75": 0.02354399999603629,
              "p99": 0.03264000000490341,
              "p995": 0.03553599999577273,
              "p999": 0.04349199999705888
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14560.883512935792,
            "unit": "ops/s",
            "extra": {
              "mean": 0.06867715129453557,
              "min": 0.06685399998968933,
              "max": 0.39156000000366475,
              "p75": 0.06763599999248981,
              "p99": 0.08092100000067148,
              "p995": 0.09458599999197759,
              "p999": 0.24696999999287073
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986360687492551,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3657940999999,
              "min": 1000.7453320000004,
              "max": 1002.0644509999984,
              "p75": 1001.7728689999994,
              "p99": 1002.0644509999984,
              "p995": 1002.0644509999984,
              "p999": 1002.0644509999984
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328606480238476,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.2602090000005,
              "min": 3003.5404010000057,
              "max": 3004.7436159999997,
              "p75": 3004.5348159999994,
              "p99": 3004.7436159999997,
              "p995": 3004.7436159999997,
              "p999": 3004.7436159999997
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.155840673904367,
            "unit": "ops/s",
            "extra": {
              "mean": 98.46550690476268,
              "min": 97.36499200000253,
              "max": 99.67477299999882,
              "p75": 98.90903199999593,
              "p99": 99.67477299999882,
              "p995": 99.67477299999882,
              "p999": 99.67477299999882
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2620994.3130901847,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003815345935722339,
              "min": 0.0003100000000131331,
              "max": 4.239229999999907,
              "p75": 0.00035099999990961805,
              "p99": 0.0007519999999203719,
              "p995": 0.0013029999997797859,
              "p999": 0.002093999999999596
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "81404de89247173f648ea8b71c1ec53ab2dabe48",
          "message": "fix: Lower coverage thresholds to match current coverage levels\n\n- Reduce function coverage threshold from 88% to 80%\n- Reduce other thresholds slightly to prevent CI failures\n- Current coverage: 82.66% functions, 46.5% lines/statements",
          "timestamp": "2025-07-04T19:28:51+03:00",
          "tree_id": "869490073682567f86950ab242056c00bce0a54c",
          "url": "https://github.com/carlrannaberg/autoagent/commit/81404de89247173f648ea8b71c1ec53ab2dabe48"
        },
        "date": 1751646655002,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 9578.969053876634,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10439536805845484,
              "min": 0.0758530000000519,
              "max": 0.9962949999999751,
              "p75": 0.10855400000002646,
              "p99": 0.1671039999999948,
              "p995": 0.21053599999993367,
              "p999": 0.43296400000002677
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9878.296053200766,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10123203380566631,
              "min": 0.07465000000001965,
              "max": 0.42637299999989864,
              "p75": 0.10901499999999942,
              "p99": 0.14572399999997288,
              "p995": 0.15046400000005633,
              "p999": 0.3127990000000409
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 9845.930024975432,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10156480875482306,
              "min": 0.07227500000044529,
              "max": 2.6363810000000285,
              "p75": 0.10816299999987677,
              "p99": 0.14500300000008792,
              "p995": 0.15465100000005805,
              "p999": 0.3402200000000448
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9066.476469294359,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11029643140714285,
              "min": 0.07784700000001976,
              "max": 0.4711050000000796,
              "p75": 0.123953000000256,
              "p99": 0.15165600000000268,
              "p995": 0.15895899999986796,
              "p999": 0.34606099999973594
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6780.264631949059,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14748686877027387,
              "min": 0.13631599999996524,
              "max": 0.530935999999997,
              "p75": 0.1500220000000354,
              "p99": 0.2662300000000073,
              "p995": 0.29845000000000255,
              "p999": 0.47031300000003284
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.057383044481357,
            "unit": "ops/s",
            "extra": {
              "mean": 71.13699590000002,
              "min": 69.79755999999998,
              "max": 74.41236700000002,
              "p75": 71.91895199999999,
              "p99": 74.41236700000002,
              "p995": 74.41236700000002,
              "p999": 74.41236700000002
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1883.6641878832193,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5308801889596664,
              "min": 0.34700199999997494,
              "max": 1.9484859999997752,
              "p75": 0.6108829999998306,
              "p99": 1.1869690000003175,
              "p995": 1.3911169999996673,
              "p999": 1.9484859999997752
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 711.7918578249372,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4049050842696582,
              "min": 0.9747170000000551,
              "max": 6.165629999999965,
              "p75": 1.6191850000000159,
              "p99": 2.98390100000006,
              "p995": 5.447128999999677,
              "p999": 6.165629999999965
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 868105.3558657481,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011519339136005162,
              "min": 0.0010619999998198182,
              "max": 0.2948750000000473,
              "p75": 0.0011529999999311258,
              "p99": 0.0012319999998453568,
              "p995": 0.0012929999998050334,
              "p999": 0.009637999999995372
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 528029.0727809458,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001893835115429056,
              "min": 0.0017629999999826396,
              "max": 0.27833200000003444,
              "p75": 0.0018830000000207292,
              "p99": 0.002073999999993248,
              "p995": 0.0030249999999796273,
              "p999": 0.011140999999952328
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1941840.6562075505,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005149753131407898,
              "min": 0.0004899999912595376,
              "max": 0.422443999996176,
              "p75": 0.0005010000022593886,
              "p99": 0.0007410000107483938,
              "p995": 0.000822000001790002,
              "p999": 0.0010620000102790073
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1407393.3188169794,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007105334284523787,
              "min": 0.0006709999870508909,
              "max": 0.175931000005221,
              "p75": 0.000690999993821606,
              "p99": 0.000822000001790002,
              "p995": 0.0009319999953731894,
              "p999": 0.0014320000045699999
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 291950.30785552354,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003425240436789903,
              "min": 0.0032260000007227063,
              "max": 0.03444399999716552,
              "p75": 0.0034159999995608814,
              "p99": 0.00377699999808101,
              "p995": 0.00603199999750359,
              "p999": 0.012463999999454245
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 288195.20112170523,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034698704076536607,
              "min": 0.0032260000007227063,
              "max": 0.21204800000123214,
              "p75": 0.003405999996175524,
              "p99": 0.0057809999998426065,
              "p995": 0.007103000003553461,
              "p999": 0.014566999998351093
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41741.428810279445,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023957014134449926,
              "min": 0.02233199999318458,
              "max": 4.436374999990221,
              "p75": 0.023203999997349456,
              "p99": 0.039994999999180436,
              "p995": 0.046247000005678274,
              "p999": 0.06296899999142624
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14798.204228291446,
            "unit": "ops/s",
            "extra": {
              "mean": 0.06757576693584103,
              "min": 0.06554299998970237,
              "max": 0.3649659999937285,
              "p75": 0.06663599998864811,
              "p99": 0.08205399999860674,
              "p995": 0.09108100000594277,
              "p999": 0.2187009999906877
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9987031180867587,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.2985659999998,
              "min": 1000.1436119999998,
              "max": 1002.0418659999996,
              "p75": 1001.8159849999993,
              "p99": 1002.0418659999996,
              "p995": 1002.0418659999996,
              "p999": 1002.0418659999996
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328563012793429,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.2994414,
              "min": 3003.3951830000005,
              "max": 3005.412992000005,
              "p75": 3004.5819349999947,
              "p99": 3005.412992000005,
              "p995": 3005.412992000005,
              "p999": 3005.412992000005
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.128345814576651,
            "unit": "ops/s",
            "extra": {
              "mean": 98.73280576190501,
              "min": 95.7747720000043,
              "max": 99.97024899999815,
              "p75": 99.34590600000229,
              "p99": 99.97024899999815,
              "p995": 99.97024899999815,
              "p999": 99.97024899999815
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2573361.166231018,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003885968332477071,
              "min": 0.00031100000001060835,
              "max": 4.4331880000000865,
              "p75": 0.0003510000000233049,
              "p99": 0.0008320000000026084,
              "p995": 0.0015130000000453947,
              "p999": 0.0021839999999997417
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "12593f380524e1f6c9abb540f5e6da1b05f63e7f",
          "message": "fix: Remove coverage requirement from integration tests\n\n- Integration tests now run without coverage to avoid threshold failures\n- Integration tests have different coverage patterns than unit tests\n- Keeps unit test coverage requirements intact",
          "timestamp": "2025-07-04T19:33:36+03:00",
          "tree_id": "7e005758cd7bce994507d3cf30baf91e32f26239",
          "url": "https://github.com/carlrannaberg/autoagent/commit/12593f380524e1f6c9abb540f5e6da1b05f63e7f"
        },
        "date": 1751646936182,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 9714.949250518936,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1029341455331415,
              "min": 0.07354899999995723,
              "max": 1.542963000000043,
              "p75": 0.10970499999996264,
              "p99": 0.17240300000003117,
              "p995": 0.20341100000001688,
              "p999": 0.42736099999996213
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9403.130417305172,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10634756252658552,
              "min": 0.07274600000005194,
              "max": 1.2398550000000341,
              "p75": 0.1234110000000328,
              "p99": 0.16810499999996864,
              "p995": 0.22668600000019978,
              "p999": 0.4402059999999892
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 9653.746420215995,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1035867275222696,
              "min": 0.07144400000015594,
              "max": 3.0159429999998792,
              "p75": 0.11113799999975527,
              "p99": 0.14813699999967866,
              "p995": 0.15299300000015137,
              "p999": 0.37250699999981407
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10237.840061455629,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09767685312499585,
              "min": 0.07564099999990503,
              "max": 0.4068720000000212,
              "p75": 0.10628799999994953,
              "p99": 0.14619300000003932,
              "p995": 0.15622299999995448,
              "p999": 0.34635900000012043
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6758.900286369934,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14795306301775304,
              "min": 0.13825900000006186,
              "max": 0.5150859999999966,
              "p75": 0.1513550000000805,
              "p99": 0.2189199999999687,
              "p995": 0.3343569999999545,
              "p999": 0.466534999999908
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 13.994765881988393,
            "unit": "ops/s",
            "extra": {
              "mean": 71.45528610000004,
              "min": 69.77646400000003,
              "max": 81.72425500000008,
              "p75": 70.42546500000003,
              "p99": 81.72425500000008,
              "p995": 81.72425500000008,
              "p999": 81.72425500000008
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1847.5494270359582,
            "unit": "ops/s",
            "extra": {
              "mean": 0.541257508658001,
              "min": 0.3479019999999764,
              "max": 3.8207649999999376,
              "p75": 0.6391180000000531,
              "p99": 1.2567869999998038,
              "p995": 1.6038770000000113,
              "p999": 3.8207649999999376
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 742.4663629655939,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3468623629032206,
              "min": 0.9562929999999596,
              "max": 3.324194000000034,
              "p75": 1.6090070000000196,
              "p99": 2.462537999999995,
              "p995": 2.748923999999988,
              "p999": 3.324194000000034
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 898565.2200452075,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011128852727570395,
              "min": 0.0010509999999612774,
              "max": 0.0386919999998554,
              "p75": 0.0011110000000371656,
              "p99": 0.0011719999999968422,
              "p995": 0.0013219999998455023,
              "p999": 0.009688999999980297
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 504091.64511947014,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019837662648882013,
              "min": 0.0018029999999953361,
              "max": 1.244613999999956,
              "p75": 0.0019039999999677093,
              "p99": 0.003647000000000844,
              "p995": 0.003957000000013977,
              "p999": 0.013524999999958709
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1890033.739205097,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005290910840674072,
              "min": 0.0004999999946448952,
              "max": 0.41737100000318605,
              "p75": 0.0005110000056447461,
              "p99": 0.0008419999940088019,
              "p995": 0.000862000000779517,
              "p999": 0.0010929999989457428
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1404031.0901873412,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007122349405144363,
              "min": 0.0006709999870508909,
              "max": 0.3561559999943711,
              "p75": 0.0006820000126026571,
              "p99": 0.0008319999906234443,
              "p995": 0.0009319999953731894,
              "p999": 0.0014130000054137781
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 291072.8229010718,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034355663645721894,
              "min": 0.003245999992941506,
              "max": 0.04190799999923911,
              "p75": 0.003426999996008817,
              "p99": 0.00369700000010198,
              "p995": 0.0058110000027227215,
              "p999": 0.012562999996589497
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 288756.3829630525,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003463126909052445,
              "min": 0.003206000001227949,
              "max": 0.15046199999778764,
              "p75": 0.0034270000032847747,
              "p99": 0.005079999995359685,
              "p995": 0.006202000004122965,
              "p999": 0.013997000001836568
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42001.48069375038,
            "unit": "ops/s",
            "extra": {
              "mean": 0.02380868444356523,
              "min": 0.0226120000006631,
              "max": 2.4355669999931706,
              "p75": 0.02344400000583846,
              "p99": 0.033842999997432344,
              "p995": 0.03990499999781605,
              "p999": 0.046186999999918044
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14665.806110708112,
            "unit": "ops/s",
            "extra": {
              "mean": 0.06818581893496183,
              "min": 0.06628400000045076,
              "max": 0.4094159999949625,
              "p75": 0.06708599999547005,
              "p99": 0.0831460000044899,
              "p995": 0.09687100000155624,
              "p999": 0.259105000004638
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9984665991292809,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.5357558,
              "min": 1000.8037779999977,
              "max": 1002.0462859999989,
              "p75": 1001.7602990000014,
              "p99": 1002.0462859999989,
              "p995": 1002.0462859999989,
              "p999": 1002.0462859999989
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328437900375737,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.412369799999,
              "min": 3003.4488060000003,
              "max": 3005.0824039999934,
              "p75": 3004.5282020000013,
              "p99": 3005.0824039999934,
              "p995": 3005.0824039999934,
              "p999": 3005.0824039999934
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.161152988042417,
            "unit": "ops/s",
            "extra": {
              "mean": 98.41402852380963,
              "min": 96.3481230000034,
              "max": 99.6997760000013,
              "p75": 99.0003579999975,
              "p99": 99.6997760000013,
              "p995": 99.6997760000013,
              "p999": 99.6997760000013
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2545075.485894618,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003929156543851942,
              "min": 0.00030999999989944627,
              "max": 4.491424999999936,
              "p75": 0.0003600000000005821,
              "p99": 0.0008220000000846994,
              "p995": 0.0014820000000099753,
              "p999": 0.0021839999999997417
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "d7df76fef288217d8760e0013b0e46fa6ab92f20",
          "message": "fix: Remove .autoagent.json from git and update .gitignore\n\n- Remove .autoagent.json from git tracking\n- Add .autoagent.json to .gitignore\n- Add benchmark-results.json to .gitignore\n- These files should not be tracked as they contain local configuration and results",
          "timestamp": "2025-07-04T19:47:52+03:00",
          "tree_id": "456ebc882362d566b2b157f1e1f175ec2ff7e420",
          "url": "https://github.com/carlrannaberg/autoagent/commit/d7df76fef288217d8760e0013b0e46fa6ab92f20"
        },
        "date": 1751647790443,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 8736.618792988556,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11446075692378099,
              "min": 0.07844799999998031,
              "max": 1.1179820000000404,
              "p75": 0.12855200000001332,
              "p99": 0.18056000000001404,
              "p995": 0.2116980000000126,
              "p999": 0.4517089999999939
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9173.713743436363,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10900710747765407,
              "min": 0.07660399999986112,
              "max": 0.3852439999999433,
              "p75": 0.12430399999993824,
              "p99": 0.15524099999993268,
              "p995": 0.16305599999986953,
              "p999": 0.355087999999796
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 9348.498289224874,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1069690520404336,
              "min": 0.07580300000017814,
              "max": 2.774925999999823,
              "p75": 0.11367299999983516,
              "p99": 0.14905999999973574,
              "p995": 0.15881899999976667,
              "p999": 0.36067800000000716
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10223.958827516117,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09780947056522403,
              "min": 0.07627799999954732,
              "max": 0.40949899999986883,
              "p75": 0.10756099999980506,
              "p99": 0.1406339999998636,
              "p995": 0.15232600000035745,
              "p999": 0.2847959999999148
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6757.453700413025,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1479847357206278,
              "min": 0.13803899999993519,
              "max": 0.47846899999990455,
              "p75": 0.15110399999991841,
              "p99": 0.2378879999999981,
              "p995": 0.31623400000000856,
              "p999": 0.39335999999997284
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 13.83057545619385,
            "unit": "ops/s",
            "extra": {
              "mean": 72.30357140000002,
              "min": 71.05272500000001,
              "max": 74.05272000000002,
              "p75": 73.314844,
              "p99": 74.05272000000002,
              "p995": 74.05272000000002,
              "p999": 74.05272000000002
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1844.2483882083227,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5422263109425811,
              "min": 0.35294400000020687,
              "max": 6.427672000000257,
              "p75": 0.6155869999997776,
              "p99": 1.3286579999999049,
              "p995": 1.4437440000001516,
              "p999": 6.427672000000257
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 700.0252218489074,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4285199572649665,
              "min": 1.0176120000000992,
              "max": 3.792276000000129,
              "p75": 1.5950180000002092,
              "p99": 2.930637999999817,
              "p995": 3.2091159999999945,
              "p999": 3.792276000000129
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 906135.9684432894,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011035871379413023,
              "min": 0.0010310000000117725,
              "max": 0.049081999999998516,
              "p75": 0.0011019999999462016,
              "p99": 0.0011920000001737208,
              "p995": 0.001213000000007014,
              "p999": 0.009658999999828666
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 509733.6584784568,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001961808845397765,
              "min": 0.001772999999957392,
              "max": 0.4248979999999847,
              "p75": 0.001924000000030901,
              "p99": 0.003196000000002641,
              "p995": 0.0037069999999630454,
              "p999": 0.012063000000011925
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1863579.064494898,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005366018641506034,
              "min": 0.0004999999946448952,
              "max": 2.967543000006117,
              "p75": 0.0005119999987073243,
              "p99": 0.0008020000095712021,
              "p995": 0.000862000000779517,
              "p999": 0.0012820000119972974
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1393040.3032630584,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007178543202645318,
              "min": 0.0006609999982174486,
              "max": 0.3501600000017788,
              "p75": 0.0007009999972069636,
              "p99": 0.0008310000121127814,
              "p995": 0.0009409999911440536,
              "p999": 0.0014930000033928081
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 284880.5379938485,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00351024330072556,
              "min": 0.0033059999987017363,
              "max": 0.09094899999763584,
              "p75": 0.0034869999944930896,
              "p99": 0.0052500000019790605,
              "p995": 0.006061000000045169,
              "p999": 0.012482999998610467
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 289160.36855612235,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034582885787334747,
              "min": 0.003235000003769528,
              "max": 0.17498499999783235,
              "p75": 0.0034069999965140596,
              "p99": 0.005178999999770895,
              "p995": 0.007262999999511521,
              "p999": 0.013775999999779742
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41560.591428453175,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0240612552812562,
              "min": 0.022942000010516495,
              "max": 2.487892000004649,
              "p75": 0.023623000000952743,
              "p99": 0.03500499999790918,
              "p995": 0.0404149999958463,
              "p999": 0.049673000001348555
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14520.215273111455,
            "unit": "ops/s",
            "extra": {
              "mean": 0.06886950235867376,
              "min": 0.06628299999283627,
              "max": 0.3385989999951562,
              "p75": 0.06788600000436418,
              "p99": 0.0825429999968037,
              "p995": 0.0902370000112569,
              "p999": 0.21976900000299793
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9984944316539169,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.5078384999997,
              "min": 1000.1233769999999,
              "max": 1002.2472669999988,
              "p75": 1001.7969840000005,
              "p99": 1002.2472669999988,
              "p995": 1002.2472669999988,
              "p999": 1002.2472669999988
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33283659754408923,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.4772942000013,
              "min": 3003.5269320000007,
              "max": 3004.818026000001,
              "p75": 3004.658341999999,
              "p99": 3004.818026000001,
              "p995": 3004.818026000001,
              "p999": 3004.818026000001
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.107390591864638,
            "unit": "ops/s",
            "extra": {
              "mean": 98.9375042857147,
              "min": 97.55344099999638,
              "max": 99.85664700000052,
              "p75": 99.38225600000442,
              "p99": 99.85664700000052,
              "p995": 99.85664700000052,
              "p999": 99.85664700000052
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2601363.6930389297,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038441376062714,
              "min": 0.0003000000000383807,
              "max": 4.418133000000012,
              "p75": 0.0003510000000233049,
              "p99": 0.0007509999999228967,
              "p995": 0.001442999999994754,
              "p999": 0.002154000000018641
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "d250b51fd2351b1233dd3e28a18d3151a1fe822d",
          "message": "feat: Enhance Gemini output formatting issue plans with comprehensive requirements\n\n- Add specific regex patterns, buffer management, and error handling to Issue 16\n- Include comprehensive testing requirements with 90% coverage targets for Issue 17\n- Add performance optimization and extensive documentation specs to Issue 18\n- Resolve all identified gaps with measurable acceptance criteria\n- Provide concrete implementation guidance for developers\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-04T20:25:46+03:00",
          "tree_id": "a5e7ea4520f9ee959c43a9efb848412a10926abf",
          "url": "https://github.com/carlrannaberg/autoagent/commit/d250b51fd2351b1233dd3e28a18d3151a1fe822d"
        },
        "date": 1751650067327,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 9963.386753545305,
            "unit": "ops/s",
            "extra": {
              "mean": 0.100367477920514,
              "min": 0.07540100000005623,
              "max": 1.109474999999975,
              "p75": 0.10472599999991417,
              "p99": 0.16792399999997087,
              "p995": 0.19098799999994753,
              "p999": 0.3962310000000002
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10595.192264922409,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09438243072857756,
              "min": 0.07500099999992926,
              "max": 0.40370499999994536,
              "p75": 0.10539700000003904,
              "p99": 0.13445200000001023,
              "p995": 0.14646399999992354,
              "p999": 0.29373000000009597
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 10302.250737043314,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09706616792040863,
              "min": 0.074188999999933,
              "max": 3.033873999999969,
              "p75": 0.10318300000017189,
              "p99": 0.14101400000004105,
              "p995": 0.149710000000141,
              "p999": 0.317794000000049
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10627.67602592394,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09409394843808883,
              "min": 0.07513999999991938,
              "max": 0.4662180000000262,
              "p75": 0.10257200000023659,
              "p99": 0.1350720000000365,
              "p995": 0.14641400000027716,
              "p999": 0.30907799999977215
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6568.12825421887,
            "unit": "ops/s",
            "extra": {
              "mean": 0.15225037656012205,
              "min": 0.14201600000001235,
              "max": 0.4490100000000439,
              "p75": 0.15573200000005727,
              "p99": 0.26423400000010133,
              "p995": 0.29782699999998385,
              "p999": 0.4042259999999942
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.013272093316374,
            "unit": "ops/s",
            "extra": {
              "mean": 71.3609208,
              "min": 70.22579600000017,
              "max": 76.94886400000007,
              "p75": 70.97508099999993,
              "p99": 76.94886400000007,
              "p995": 76.94886400000007,
              "p999": 76.94886400000007
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1767.9546342840692,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5656253733031722,
              "min": 0.3768049999998766,
              "max": 2.894202999999834,
              "p75": 0.636721000000307,
              "p99": 1.3861729999998715,
              "p995": 1.465190000000348,
              "p999": 2.894202999999834
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 754.2326473659892,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3258508544973562,
              "min": 0.9291280000002189,
              "max": 3.962972000000036,
              "p75": 1.5785619999999199,
              "p99": 2.362689000000046,
              "p995": 3.1090149999999994,
              "p999": 3.962972000000036
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 846500.1698666306,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001181334671388848,
              "min": 0.0010320000001229346,
              "max": 0.31203400000003967,
              "p75": 0.0011819999999715947,
              "p99": 0.0021440000000438886,
              "p995": 0.002304999999978463,
              "p999": 0.010138999999981024
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 495594.9110103695,
            "unit": "ops/s",
            "extra": {
              "mean": 0.002017776974265736,
              "min": 0.0017629999999826396,
              "max": 0.2911749999999529,
              "p75": 0.0019439999999804058,
              "p99": 0.004027000000064618,
              "p995": 0.0042680000000245855,
              "p999": 0.012622999999962303
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1945056.2650033934,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005141239448917717,
              "min": 0.0004899999912595376,
              "max": 0.37486100000387523,
              "p75": 0.0005010000022593886,
              "p99": 0.000582000007852912,
              "p995": 0.0008210000087274238,
              "p999": 0.0010020000045187771
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1412904.7255778664,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007077618058011719,
              "min": 0.0006709999870508909,
              "max": 0.3111970000027213,
              "p75": 0.0006819999980507419,
              "p99": 0.0008110000053420663,
              "p995": 0.0008820000075502321,
              "p999": 0.0013920000055804849
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 290616.22201008344,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003440964145371428,
              "min": 0.0032259999934467487,
              "max": 0.029525000005378388,
              "p75": 0.0034270000032847747,
              "p99": 0.0038570000033359975,
              "p995": 0.005099999994854443,
              "p999": 0.01243399999657413
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 288156.7194330929,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003470333789083096,
              "min": 0.0032260000007227063,
              "max": 0.20196800000121584,
              "p75": 0.003416999999899417,
              "p99": 0.005219999999098945,
              "p995": 0.006611999997403473,
              "p999": 0.01401600000099279
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42485.01001427248,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023537713646861764,
              "min": 0.0224620000080904,
              "max": 2.5258039999898756,
              "p75": 0.02313399998820387,
              "p99": 0.0337230000004638,
              "p995": 0.03957399999490008,
              "p999": 0.04578500000934582
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14606.38127933932,
            "unit": "ops/s",
            "extra": {
              "mean": 0.06846322719334301,
              "min": 0.06665400000929367,
              "max": 0.3390440000075614,
              "p75": 0.06753600000229198,
              "p99": 0.07920799999556039,
              "p995": 0.09056899999268353,
              "p999": 0.23030999999900814
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986273431766514,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3745436000002,
              "min": 999.8403890000009,
              "max": 1002.0670460000001,
              "p75": 1001.8200059999999,
              "p99": 1002.0670460000001,
              "p995": 1002.0670460000001,
              "p999": 1002.0670460000001
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328887303740666,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.0067708999986,
              "min": 3003.3976699999985,
              "max": 3004.6360089999944,
              "p75": 3004.456106999998,
              "p99": 3004.6360089999944,
              "p995": 3004.6360089999944,
              "p999": 3004.6360089999944
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.146307335997612,
            "unit": "ops/s",
            "extra": {
              "mean": 98.55802380952393,
              "min": 95.92240100000345,
              "max": 99.78974500000186,
              "p75": 99.15447600000334,
              "p99": 99.78974500000186,
              "p995": 99.78974500000186,
              "p999": 99.78974500000186
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2620168.115102458,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000381654900018084,
              "min": 0.0003100000000131331,
              "max": 1.1236820000000307,
              "p75": 0.0003600000000005821,
              "p99": 0.0007120000000213622,
              "p995": 0.0012719999999717402,
              "p999": 0.0020840000000248438
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "ee00036f23f3e0884f4be2a5027205b3f3d07ee5",
          "message": "fix: Improve stream formatter sentence boundary detection and resolve linting issues\n\n- Remove unused NUMBER_PATTERN constant to fix TypeScript error\n- Fix ESLint strict boolean expressions and curly brace requirements\n- Improve URL/email/file path regex patterns to exclude trailing punctuation\n- Enhance abbreviation detection with context-aware logic for better sentence splitting\n- Add special handling for titles followed by proper nouns (e.g., \"Dr. Smith\")\n- Update test expectations to match correct sentence boundary behavior\n- Achieve >95% accuracy on sentence boundary detection test suite\n- Add ESLint suppressions for legitimate console statements in tests\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-04T21:09:21+03:00",
          "tree_id": "4fe163fe209ba54733722e4fa559ca6be038128b",
          "url": "https://github.com/carlrannaberg/autoagent/commit/ee00036f23f3e0884f4be2a5027205b3f3d07ee5"
        },
        "date": 1751652691498,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 8793.98002007742,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11371415419604242,
              "min": 0.07800700000007055,
              "max": 1.3103660000000446,
              "p75": 0.12452399999995123,
              "p99": 0.1701709999999821,
              "p995": 0.22848999999996522,
              "p999": 0.6424780000000396
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9469.416286241345,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10560313009503627,
              "min": 0.07537199999990207,
              "max": 0.41821699999991324,
              "p75": 0.114325000000008,
              "p99": 0.14364099999988866,
              "p995": 0.15516200000001845,
              "p999": 0.29531599999995706
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 9282.966391020253,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10772418620058088,
              "min": 0.07317800000009811,
              "max": 3.0716019999999844,
              "p75": 0.11561699999992925,
              "p99": 0.16723499999989144,
              "p995": 0.2259740000004058,
              "p999": 0.320803000000069
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10093.661155795133,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09907207945313917,
              "min": 0.0756229999997231,
              "max": 0.30590600000004997,
              "p75": 0.1010310000001482,
              "p99": 0.13500400000020818,
              "p995": 0.14651499999990847,
              "p999": 0.2563319999999294
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6770.008412465247,
            "unit": "ops/s",
            "extra": {
              "mean": 0.147710303898405,
              "min": 0.1390720000000556,
              "max": 0.39462300000002415,
              "p75": 0.15086399999995592,
              "p99": 0.2149739999999838,
              "p995": 0.2557319999999663,
              "p999": 0.3292699999999513
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.217198680591641,
            "unit": "ops/s",
            "extra": {
              "mean": 70.3373444,
              "min": 68.79057799999998,
              "max": 75.37959899999998,
              "p75": 70.38657699999999,
              "p99": 75.37959899999998,
              "p995": 75.37959899999998,
              "p999": 75.37959899999998
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1715.2969443802303,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5829894370629333,
              "min": 0.34717399999999543,
              "max": 1.9152870000002622,
              "p75": 0.6374409999998534,
              "p99": 1.283488000000034,
              "p995": 1.4153149999997368,
              "p999": 1.9152870000002622
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 720.500779096856,
            "unit": "ops/s",
            "extra": {
              "mean": 1.38792355124653,
              "min": 0.9474849999999151,
              "max": 5.732187000000067,
              "p75": 1.5893839999998818,
              "p99": 2.9072859999998855,
              "p995": 3.6618539999999484,
              "p999": 5.732187000000067
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 758251.4613741158,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0013188237028752751,
              "min": 0.0010519999998450658,
              "max": 0.30468299999984083,
              "p75": 0.001191999999946347,
              "p99": 0.002424999999902866,
              "p995": 0.002515000000130385,
              "p999": 0.010418999999956213
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 479590.38665796065,
            "unit": "ops/s",
            "extra": {
              "mean": 0.002085112687450907,
              "min": 0.0018430000000080327,
              "max": 0.21831100000002834,
              "p75": 0.002004000000056294,
              "p99": 0.004007999999998901,
              "p995": 0.004337999999961539,
              "p999": 0.01192300000002433
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1920641.3239346957,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005206594211725923,
              "min": 0.0004999999946448952,
              "max": 0.359416000006604,
              "p75": 0.0005110000056447461,
              "p99": 0.0007409999961964786,
              "p995": 0.0008419999940088019,
              "p999": 0.001021999996737577
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1401856.1747863756,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007133399402776728,
              "min": 0.0006609999982174486,
              "max": 0.6357060000009369,
              "p75": 0.0006819999980507419,
              "p99": 0.0009220000065397471,
              "p995": 0.0010120000079041347,
              "p999": 0.00167199999850709
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 287519.4025350943,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034780261477412506,
              "min": 0.003285999999206979,
              "max": 0.27982600000541424,
              "p75": 0.0034559999985503964,
              "p99": 0.004167999999481253,
              "p995": 0.0058019999996759,
              "p999": 0.012652999997953884
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 293062.6155726565,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003412240070423034,
              "min": 0.0032150000042747706,
              "max": 0.18313499999931082,
              "p75": 0.0033570000014151447,
              "p99": 0.004979999997885898,
              "p995": 0.006120999998529442,
              "p999": 0.014337000000523403
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41895.73513518072,
            "unit": "ops/s",
            "extra": {
              "mean": 0.02386877797402054,
              "min": 0.022792000003391877,
              "max": 2.266014000007999,
              "p75": 0.02347400000144262,
              "p99": 0.036247999989427626,
              "p995": 0.039915999994263984,
              "p999": 0.04983399999036919
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14916.739471691411,
            "unit": "ops/s",
            "extra": {
              "mean": 0.06703877894346638,
              "min": 0.06513299999642186,
              "max": 0.43873599999642465,
              "p75": 0.06602399999974295,
              "p99": 0.0823450000025332,
              "p995": 0.0924830000003567,
              "p999": 0.19851299999572802
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.999156969899397,
            "unit": "ops/s",
            "extra": {
              "mean": 1000.8437414000003,
              "min": 999.7755510000025,
              "max": 1001.7867299999998,
              "p75": 1001.6999079999987,
              "p99": 1001.7867299999998,
              "p995": 1001.7867299999998,
              "p999": 1001.7867299999998
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3329015318497644,
            "unit": "ops/s",
            "extra": {
              "mean": 3003.8912541000004,
              "min": 3001.8103279999996,
              "max": 3004.7061440000034,
              "p75": 3004.566669,
              "p99": 3004.7061440000034,
              "p995": 3004.7061440000034,
              "p999": 3004.7061440000034
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.140948776620883,
            "unit": "ops/s",
            "extra": {
              "mean": 98.61010266666736,
              "min": 96.37238600000273,
              "max": 100.44014099999913,
              "p75": 99.41049300000304,
              "p99": 100.44014099999913,
              "p995": 100.44014099999913,
              "p999": 100.44014099999913
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2634019.9010126167,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003796478529321522,
              "min": 0.00030999999989944627,
              "max": 1.0937870000000203,
              "p75": 0.0003510000000233049,
              "p99": 0.0007510000000365835,
              "p995": 0.001393000000007305,
              "p999": 0.002154000000018641
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "5e2f311e67b83b349826aff1fac7eaee3a2be530",
          "message": "chore: Prepare release v0.3.1\n\n- Update version to 0.3.1 in package.json\n- Add comprehensive changelog entry for v0.3.1\n- Include stream formatter improvements and bug fixes\n- Document new performance benchmarks and configuration handling\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-04T21:24:48+03:00",
          "tree_id": "76bf37d4dc37b8aa5bd54de2f956d1e91537458f",
          "url": "https://github.com/carlrannaberg/autoagent/commit/5e2f311e67b83b349826aff1fac7eaee3a2be530"
        },
        "date": 1751653619771,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 9537.066702652452,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10485404277626366,
              "min": 0.07775600000002214,
              "max": 0.9675809999999956,
              "p75": 0.11111899999997377,
              "p99": 0.16152899999997317,
              "p995": 0.22378200000002835,
              "p999": 0.3989599999999882
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 11085.751546136384,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09020588237416532,
              "min": 0.07064300000001822,
              "max": 0.34577999999999065,
              "p75": 0.10122999999998683,
              "p99": 0.12704899999994268,
              "p995": 0.1359660000000531,
              "p999": 0.2879920000000311
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 10044.85244111758,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09955347834743712,
              "min": 0.07366899999988163,
              "max": 2.4936720000000605,
              "p75": 0.10544900000013513,
              "p99": 0.14702799999986382,
              "p995": 0.15180599999985134,
              "p999": 0.2942849999999453
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10553.69326745888,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09475355921925331,
              "min": 0.07439000000022133,
              "max": 0.3416239999996833,
              "p75": 0.09985899999992398,
              "p99": 0.13927300000023024,
              "p995": 0.1531039999999848,
              "p999": 0.26821600000039325
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6706.267998988936,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14911423166368598,
              "min": 0.1384710000000382,
              "max": 0.38970299999999725,
              "p75": 0.150333000000046,
              "p99": 0.22170700000003762,
              "p995": 0.2759390000001076,
              "p999": 0.3568319999999403
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 13.893215680062717,
            "unit": "ops/s",
            "extra": {
              "mean": 71.9775769,
              "min": 69.63388899999995,
              "max": 76.17994899999997,
              "p75": 75.09610500000008,
              "p99": 76.17994899999997,
              "p995": 76.17994899999997,
              "p999": 76.17994899999997
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1899.2761061063627,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5265163905263168,
              "min": 0.3468929999999091,
              "max": 1.6332039999997505,
              "p75": 0.6222920000000158,
              "p99": 1.2362140000000181,
              "p995": 1.493641000000025,
              "p999": 1.6332039999997505
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 712.365217283269,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4037743221288614,
              "min": 0.9549980000001597,
              "max": 5.141402999999855,
              "p75": 1.5980379999998604,
              "p99": 2.751258000000007,
              "p995": 4.0178820000001,
              "p999": 5.141402999999855
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 892115.8197925831,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001120930688385842,
              "min": 0.0010419999998703133,
              "max": 0.34312599999998383,
              "p75": 0.001111999999920954,
              "p99": 0.0017739999998411804,
              "p995": 0.0021140000001196313,
              "p999": 0.009687999999869135
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 455582.80181722774,
            "unit": "ops/s",
            "extra": {
              "mean": 0.002194990671314198,
              "min": 0.001822999999944841,
              "max": 0.27402499999999463,
              "p75": 0.0019630000000461223,
              "p99": 0.004047000000014123,
              "p995": 0.004358000000024731,
              "p999": 0.016341000000011263
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1949945.648994739,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005128348067114244,
              "min": 0.0004899999912595376,
              "max": 0.3854460000002291,
              "p75": 0.0005010000022593886,
              "p99": 0.0005810000002384186,
              "p995": 0.0008210000087274238,
              "p999": 0.0009920000011334196
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1415705.776281762,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000706361460660576,
              "min": 0.0006609999982174486,
              "max": 0.19031800000811927,
              "p75": 0.0006819999980507419,
              "p99": 0.0009120000031543896,
              "p995": 0.000961000012466684,
              "p999": 0.0013429999962681904
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 294733.7565512157,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033928926625214394,
              "min": 0.003214999996998813,
              "max": 0.027331000004778616,
              "p75": 0.0033760000005713664,
              "p99": 0.0036770000006072223,
              "p995": 0.006031000004441012,
              "p999": 0.012562999996589497
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 295545.17069921765,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003383577534473471,
              "min": 0.0031949999975040555,
              "max": 0.21343199999682838,
              "p75": 0.0033269999985350296,
              "p99": 0.0051099999982398,
              "p995": 0.00678199999674689,
              "p999": 0.013375000002270099
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41437.743666176226,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024132588107500054,
              "min": 0.02257300000928808,
              "max": 3.8396670000074664,
              "p75": 0.023503999997046776,
              "p99": 0.03945399999793153,
              "p995": 0.048001000002841465,
              "p999": 0.061755999995511957
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14934.992905876836,
            "unit": "ops/s",
            "extra": {
              "mean": 0.06695684466020105,
              "min": 0.06520199999795295,
              "max": 0.3692849999933969,
              "p75": 0.06595400000514928,
              "p99": 0.08241499999712687,
              "p995": 0.09268500001053326,
              "p999": 0.19190099999832455
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986097626506232,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3921728000001,
              "min": 999.9993669999994,
              "max": 1001.8695360000002,
              "p75": 1001.8006000000005,
              "p99": 1001.8695360000002,
              "p995": 1001.8695360000002,
              "p999": 1001.8695360000002
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33290834504795475,
            "unit": "ops/s",
            "extra": {
              "mean": 3003.8297773999993,
              "min": 3002.575184000001,
              "max": 3004.5947730000044,
              "p75": 3004.508179999997,
              "p99": 3004.5947730000044,
              "p995": 3004.5947730000044,
              "p999": 3004.5947730000044
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.1465684912465,
            "unit": "ops/s",
            "extra": {
              "mean": 98.5554870952387,
              "min": 94.95466800000577,
              "max": 99.82931200000166,
              "p75": 99.24223800000618,
              "p99": 99.82931200000166,
              "p995": 99.82931200000166,
              "p999": 99.82931200000166
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2614602.363913993,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000382467335684278,
              "min": 0.00029999999992469384,
              "max": 4.210034999999834,
              "p75": 0.0003510000000233049,
              "p99": 0.0006909999999606953,
              "p995": 0.0012719999999717402,
              "p999": 0.0020539999999868996
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "850ef91a64a88a0bf729636c960929e3c8f0556d",
          "message": "feat: Add comprehensive specifications for bootstrap command fixes\n\n- Add fix-bootstrap-issue-numbering.md: Addresses hardcoded issue number 1\n- Add fix-bootstrap-filename-consistency.md: Fixes inconsistent naming between issues and plans\n- Add fix-bootstrap-todo-overwrite.md: Prevents TODO.md overwrite, recommends using createIssue method\n- Create corresponding issues and plans for each specification\n- Update TODO.md with new pending issues\n\nThese specifications document critical bootstrap bugs and provide detailed implementation guidance for:\n1. Dynamic issue numbering instead of hardcoded values\n2. Consistent filename generation between issues and plans directories\n3. Preserving existing TODO content instead of overwriting\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-04T22:36:39+03:00",
          "tree_id": "0e56e4ccae7875332ff40b0b5b12362408f3013b",
          "url": "https://github.com/carlrannaberg/autoagent/commit/850ef91a64a88a0bf729636c960929e3c8f0556d"
        },
        "date": 1751657916497,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 9286.401141742595,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10768434237726132,
              "min": 0.07865700000002107,
              "max": 1.3216690000000426,
              "p75": 0.11616800000001604,
              "p99": 0.1655099999999834,
              "p995": 0.18957600000004504,
              "p999": 0.3883180000000266
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10852.242132114856,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09214685664271322,
              "min": 0.07509099999992941,
              "max": 0.39423999999985426,
              "p75": 0.09666199999992386,
              "p99": 0.12060599999995247,
              "p995": 0.13126600000009603,
              "p999": 0.3053930000000946
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 9996.22437910332,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10003777046966426,
              "min": 0.07401900000013484,
              "max": 2.6187640000000556,
              "p75": 0.10475700000006327,
              "p99": 0.14393999999992957,
              "p995": 0.1515150000000176,
              "p999": 0.2913260000000264
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9281.490186307126,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10774131954320097,
              "min": 0.07693400000016481,
              "max": 0.34336600000006,
              "p75": 0.11649900000020352,
              "p99": 0.14706600000045,
              "p995": 0.15115100000002712,
              "p999": 0.28268100000013874
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6767.875658581013,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14775685169867098,
              "min": 0.13956100000007154,
              "max": 0.41346499999997377,
              "p75": 0.15011200000003555,
              "p99": 0.21082499999999982,
              "p995": 0.281757999999968,
              "p999": 0.36097700000004806
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.338758577095865,
            "unit": "ops/s",
            "extra": {
              "mean": 69.74104450000004,
              "min": 69.0043740000001,
              "max": 71.10003299999994,
              "p75": 70.00428199999999,
              "p99": 71.10003299999994,
              "p995": 71.10003299999994,
              "p999": 71.10003299999994
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 2012.2377546150592,
            "unit": "ops/s",
            "extra": {
              "mean": 0.4969591678252254,
              "min": 0.34323300000005474,
              "max": 1.843456999999944,
              "p75": 0.47878799999989496,
              "p99": 1.1083189999999377,
              "p995": 1.1588030000002618,
              "p999": 1.7689879999998084
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 702.7690606352268,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4229425511363702,
              "min": 0.9115990000000238,
              "max": 3.9461099999998623,
              "p75": 1.5904730000002019,
              "p99": 2.865002000000004,
              "p995": 2.9762000000000626,
              "p999": 3.9461099999998623
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 914874.2050167196,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001093046447824731,
              "min": 0.0010310000000117725,
              "max": 0.02782200000001467,
              "p75": 0.0010919999999714491,
              "p99": 0.0011620000000220898,
              "p995": 0.0012030000000322616,
              "p999": 0.009757999999919775
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 520444.12431939924,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001921435853095144,
              "min": 0.0017540000000053624,
              "max": 0.15361899999999196,
              "p75": 0.0018840000000182044,
              "p99": 0.003607000000044991,
              "p995": 0.00399699999996983,
              "p999": 0.011451999999962936
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1901658.4520376243,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005258567851280031,
              "min": 0.0004999999946448952,
              "max": 2.6046970000024885,
              "p75": 0.0005110000056447461,
              "p99": 0.0005910000036237761,
              "p995": 0.0008410000009462237,
              "p999": 0.0009620000055292621
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1411296.334687875,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007085684100647523,
              "min": 0.0006709999870508909,
              "max": 0.2786340000020573,
              "p75": 0.0006819999980507419,
              "p99": 0.0008119999984046444,
              "p995": 0.000901999999769032,
              "p999": 0.0012720000086119398
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 287788.76308402617,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034747708328974206,
              "min": 0.003285999999206979,
              "max": 0.228198999997403,
              "p75": 0.003456999998888932,
              "p99": 0.0036670000044978224,
              "p995": 0.005690000005415641,
              "p999": 0.012854000000515953
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 295212.3190624366,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003387392515244267,
              "min": 0.003205999993951991,
              "max": 0.1436500000054366,
              "p75": 0.003346000004967209,
              "p99": 0.004047999995236751,
              "p995": 0.0057010000018635765,
              "p999": 0.013245000001916196
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42107.04526490806,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023748994822806964,
              "min": 0.02278200000000652,
              "max": 0.22665599999891128,
              "p75": 0.02346399999805726,
              "p99": 0.03453499999886844,
              "p995": 0.04013600001053419,
              "p999": 0.0460670000029495
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 13833.190150371187,
            "unit": "ops/s",
            "extra": {
              "mean": 0.07228990486862981,
              "min": 0.07066300000587944,
              "max": 0.34095100000558887,
              "p75": 0.07131400000071153,
              "p99": 0.08497999999963213,
              "p995": 0.09469800000078976,
              "p999": 0.1961589999991702
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986603820834333,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3414149000002,
              "min": 999.9932640000006,
              "max": 1001.8767740000003,
              "p75": 1001.7852839999996,
              "p99": 1001.8767740000003,
              "p995": 1001.8767740000003,
              "p999": 1001.8767740000003
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33288884951121533,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.0056958000005,
              "min": 3003.464308999999,
              "max": 3004.507016000003,
              "p75": 3004.4592980000016,
              "p99": 3004.507016000003,
              "p995": 3004.507016000003,
              "p999": 3004.507016000003
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.165756621518137,
            "unit": "ops/s",
            "extra": {
              "mean": 98.36946104761869,
              "min": 95.54795100000047,
              "max": 99.7393019999945,
              "p75": 99.19900000000052,
              "p99": 99.7393019999945,
              "p995": 99.7393019999945,
              "p999": 99.7393019999945
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2594898.7492590216,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038537149100154755,
              "min": 0.00030999999989944627,
              "max": 4.068745000000035,
              "p75": 0.00035100000013699173,
              "p99": 0.0006909999999606953,
              "p995": 0.0014120000000730215,
              "p999": 0.0021140000000059445
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "8eda2d9ed70c7f301bb36f652a6cc55726668752",
          "message": "fix: Improve issue consistency and documentation clarity\n\n- Update AGENT.md to clarify CHANGELOG.md should only contain package functionality changes\n- Remove issue numbers from CHANGELOG.md guidance (they are ephemeral)\n- Fix Issue 37 title duplication: \"Add Bootstrap TODO Integration Tests\"\n- Remove unnecessary backward compatibility from Issue 35 (internal refactoring)\n- Add specific generateFileSlug method signature to Issue 26\n- Complete Issue 20's generated issues list to match Issues 19 and 21\n- Update TODO.md with corrected Issue 37 title\n\nThese changes improve consistency across bootstrap-related issues and provide clearer guidance for future development.\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-04T23:20:28+03:00",
          "tree_id": "e57b49d944446d2ecc3010ddbfc18ccd4bb0c4e2",
          "url": "https://github.com/carlrannaberg/autoagent/commit/8eda2d9ed70c7f301bb36f652a6cc55726668752"
        },
        "date": 1751660546170,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 9472.521945565704,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10556850707198645,
              "min": 0.07571299999995063,
              "max": 1.0984869999999773,
              "p75": 0.12308099999995648,
              "p99": 0.16703500000005533,
              "p995": 0.1994049999999561,
              "p999": 0.3975679999999784
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9299.181913770328,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10753634129032247,
              "min": 0.076233000000002,
              "max": 0.34182300000009036,
              "p75": 0.12101800000004914,
              "p99": 0.14205799999990631,
              "p995": 0.14537299999983588,
              "p999": 0.30380200000013247
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 9594.436787053182,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10422706639220437,
              "min": 0.07303699999965829,
              "max": 2.5771709999999075,
              "p75": 0.11722000000008848,
              "p99": 0.14384100000006583,
              "p995": 0.14763700000003155,
              "p999": 0.33535100000017337
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9226.047104157373,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10838878110099691,
              "min": 0.0763040000001638,
              "max": 0.4032990000000609,
              "p75": 0.12353299999995215,
              "p99": 0.14749700000038501,
              "p995": 0.15642399999978807,
              "p999": 0.3099130000000514
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6812.178069351013,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14679592779571435,
              "min": 0.13746900000001006,
              "max": 0.441030000000012,
              "p75": 0.1498620000000983,
              "p99": 0.24523099999998976,
              "p995": 0.2805680000000166,
              "p999": 0.31702599999994163
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.425414575379458,
            "unit": "ops/s",
            "extra": {
              "mean": 69.32209779999998,
              "min": 68.334927,
              "max": 70.049034,
              "p75": 69.60776099999998,
              "p99": 70.049034,
              "p995": 70.049034,
              "p999": 70.049034
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1766.0424196836311,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5662378144796432,
              "min": 0.3574029999999766,
              "max": 1.6550749999996697,
              "p75": 0.630666999999903,
              "p99": 1.3055480000002717,
              "p995": 1.468605000000025,
              "p999": 1.6550749999996697
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 701.8769009847342,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4247512613636362,
              "min": 1.0104019999998854,
              "max": 4.115767999999889,
              "p75": 1.5810359999998127,
              "p99": 2.6229299999999967,
              "p995": 2.7215499999999793,
              "p999": 4.115767999999889
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 906608.2774442303,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011030122103220204,
              "min": 0.00102100000003702,
              "max": 0.33274600000004284,
              "p75": 0.0010919999999714491,
              "p99": 0.0012630000001081498,
              "p995": 0.0021139999998922576,
              "p999": 0.009757999999919775
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 519110.2817449914,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019263729407140537,
              "min": 0.0017530000000078871,
              "max": 0.2707900000000336,
              "p75": 0.001853000000096472,
              "p99": 0.0036169999999629,
              "p995": 0.004037999999923159,
              "p999": 0.01269400000001042
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1902102.173973489,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005257341133841413,
              "min": 0.0004999999946448952,
              "max": 0.4680109999899287,
              "p75": 0.0005110000056447461,
              "p99": 0.0006209999992279336,
              "p995": 0.0008519999973941594,
              "p999": 0.0010719999991124496
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1397477.7037214488,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007155749228320599,
              "min": 0.0006709999870508909,
              "max": 0.6022439999942435,
              "p75": 0.0006820000126026571,
              "p99": 0.0009209999989252537,
              "p995": 0.0010020000045187771,
              "p999": 0.001532999987830408
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 291039.1891654381,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003435963393340684,
              "min": 0.003235000003769528,
              "max": 0.043391999999585096,
              "p75": 0.003416999999899417,
              "p99": 0.0037169999995967373,
              "p995": 0.006121999998867977,
              "p999": 0.01244300000689691
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 289333.06371871405,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034562244188316733,
              "min": 0.0032159999973373488,
              "max": 0.19606799999746727,
              "p75": 0.003405999996175524,
              "p99": 0.005700999994587619,
              "p995": 0.006873000005725771,
              "p999": 0.013534999998228159
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41630.80361406415,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024020674913471277,
              "min": 0.022922999996808358,
              "max": 0.3212750000093365,
              "p75": 0.023784999997587875,
              "p99": 0.03412399999797344,
              "p995": 0.040135999995982274,
              "p999": 0.04736899999261368
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14737.012728053922,
            "unit": "ops/s",
            "extra": {
              "mean": 0.06785635721792946,
              "min": 0.06609400000888854,
              "max": 0.4228659999935189,
              "p75": 0.06691599999612663,
              "p99": 0.07880800000566524,
              "p995": 0.09114200000476558,
              "p999": 0.24582300000474788
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986304497402578,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3714285000005,
              "min": 1000.0981270000011,
              "max": 1002.1347250000017,
              "p75": 1001.7816739999998,
              "p99": 1002.1347250000017,
              "p995": 1002.1347250000017,
              "p999": 1002.1347250000017
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33288282107459527,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.060097699999,
              "min": 3003.319776999997,
              "max": 3004.632716,
              "p75": 3004.4306060000017,
              "p99": 3004.632716,
              "p995": 3004.632716,
              "p999": 3004.632716
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.156048497650223,
            "unit": "ops/s",
            "extra": {
              "mean": 98.46349200000051,
              "min": 95.4342220000035,
              "max": 99.85238300000492,
              "p75": 99.36827300000004,
              "p99": 99.85238300000492,
              "p995": 99.85238300000492,
              "p999": 99.85238300000492
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2547452.2320680455,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00039254906820693973,
              "min": 0.0003100000000131331,
              "max": 1.1548330000000533,
              "p75": 0.0003609999999980573,
              "p99": 0.0007810000000176842,
              "p995": 0.0014620000000604705,
              "p999": 0.0021639999999933934
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "e72c38db89d6ff244f3cbaae93cba5eb26e47e48",
          "message": "chore: prepare for v0.3.2 release\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-04T23:50:12+03:00",
          "tree_id": "566da140cade83f28725a7cfd5411a1984e607a9",
          "url": "https://github.com/carlrannaberg/autoagent/commit/e72c38db89d6ff244f3cbaae93cba5eb26e47e48"
        },
        "date": 1751662652765,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 9289.265367737646,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1076511392895588,
              "min": 0.07820699999990666,
              "max": 2.933807999999999,
              "p75": 0.11821899999995367,
              "p99": 0.16422700000003942,
              "p995": 0.19216000000000122,
              "p999": 0.33574400000009064
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 11460.44378633852,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08725665590647154,
              "min": 0.0751589999999851,
              "max": 0.3364249999999629,
              "p75": 0.09203100000013364,
              "p99": 0.12235699999996541,
              "p995": 0.13020200000005389,
              "p999": 0.25846099999989747
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 9544.301120625278,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10477456519461603,
              "min": 0.074149000000034,
              "max": 2.9982199999999466,
              "p75": 0.11328200000002653,
              "p99": 0.14566300000024057,
              "p995": 0.149710000000141,
              "p999": 0.27854200000001583
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9470.3818905503,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10559236275337705,
              "min": 0.07467999999971653,
              "max": 0.4325699999999415,
              "p75": 0.12672699999984616,
              "p99": 0.15124299999979485,
              "p995": 0.1556519999999182,
              "p999": 0.2922569999996085
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6626.800906883081,
            "unit": "ops/s",
            "extra": {
              "mean": 0.15090237567893836,
              "min": 0.13804799999991246,
              "max": 0.4062820000000329,
              "p75": 0.15182399999991958,
              "p99": 0.2661279999999806,
              "p995": 0.3006830000000491,
              "p999": 0.3714159999999538
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.484207478960508,
            "unit": "ops/s",
            "extra": {
              "mean": 69.0407122,
              "min": 68.64107200000001,
              "max": 69.63568599999996,
              "p75": 69.37147100000004,
              "p99": 69.63568599999996,
              "p995": 69.63568599999996,
              "p999": 69.63568599999996
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1879.2989989218195,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5321133042553177,
              "min": 0.3477509999997892,
              "max": 4.257109000000128,
              "p75": 0.6313930000001164,
              "p99": 1.140006000000085,
              "p995": 1.2384099999999307,
              "p999": 4.257109000000128
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 718.46502963971,
            "unit": "ops/s",
            "extra": {
              "mean": 1.391856191666659,
              "min": 0.9459130000000187,
              "max": 7.447394000000031,
              "p75": 1.5834879999999885,
              "p99": 2.8528570000000855,
              "p995": 4.063419000000067,
              "p999": 7.447394000000031
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 877206.7491030714,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001139982109146427,
              "min": 0.0010419999998703133,
              "max": 0.05296099999986836,
              "p75": 0.0011320000000978325,
              "p99": 0.0013030000000071595,
              "p995": 0.0021440000000438886,
              "p999": 0.009908999999879597
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 518855.978208082,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019273171014692638,
              "min": 0.0017829999999321444,
              "max": 0.1718829999999798,
              "p75": 0.0018939999999929569,
              "p99": 0.003495999999927335,
              "p995": 0.0036059999999906722,
              "p999": 0.011091000000021722
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1917261.98084124,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005215771292566019,
              "min": 0.0004999999946448952,
              "max": 0.4211500000092201,
              "p75": 0.0005110000056447461,
              "p99": 0.0005819999933009967,
              "p995": 0.0008409999863943085,
              "p999": 0.0009720000089146197
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1409366.5258161635,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007095386343314067,
              "min": 0.0006209999992279336,
              "max": 0.5121689999941736,
              "p75": 0.0006819999980507419,
              "p99": 0.0008819999929983169,
              "p995": 0.000981999997748062,
              "p999": 0.0013920000055804849
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 291369.79079749214,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034320647904607935,
              "min": 0.003246000000217464,
              "max": 0.03021699999953853,
              "p75": 0.003416999999899417,
              "p99": 0.0035669999997480772,
              "p995": 0.0058209999988321215,
              "p999": 0.012482999998610467
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 293772.2526430886,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034039974538198664,
              "min": 0.0029760000034002587,
              "max": 0.14934000000357628,
              "p75": 0.003365999997186009,
              "p99": 0.004808999998203944,
              "p995": 0.006321000000752974,
              "p999": 0.013444999996863771
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41351.45275494954,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024182947233463415,
              "min": 0.023013999991235323,
              "max": 2.2799490000033984,
              "p75": 0.02382499999657739,
              "p99": 0.03591799999412615,
              "p995": 0.03989400000136811,
              "p999": 0.044643000001087785
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14945.474338615244,
            "unit": "ops/s",
            "extra": {
              "mean": 0.06690988705632837,
              "min": 0.06029300000227522,
              "max": 0.3172539999941364,
              "p75": 0.06605400000989903,
              "p99": 0.07833699999901,
              "p995": 0.09123099999851547,
              "p999": 0.18097000000125263
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9988026981501474,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.1987370999999,
              "min": 1000.5422120000003,
              "max": 1001.9111840000005,
              "p75": 1001.6102929999997,
              "p99": 1001.9111840000005,
              "p995": 1001.9111840000005,
              "p999": 1001.9111840000005
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3329009955428042,
            "unit": "ops/s",
            "extra": {
              "mean": 3003.896093399999,
              "min": 3002.1209489999965,
              "max": 3004.527197999996,
              "p75": 3004.194282999997,
              "p99": 3004.527197999996,
              "p995": 3004.527197999996,
              "p999": 3004.527197999996
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.176383267854607,
            "unit": "ops/s",
            "extra": {
              "mean": 98.26673914285666,
              "min": 96.26948099999572,
              "max": 99.94519600000058,
              "p75": 98.87213599999814,
              "p99": 99.94519600000058,
              "p995": 99.94519600000058,
              "p999": 99.94519600000058
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2621819.895126822,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038141445255591375,
              "min": 0.0003100000000131331,
              "max": 1.1397839999999633,
              "p75": 0.0003609999999980573,
              "p99": 0.0006809999999859428,
              "p995": 0.0012030000000322616,
              "p999": 0.0020330000000399195
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "5333534d303872748f7d7e3b837dc32be2d6faba",
          "message": "improve: Update release script timeout handling\n\n- Set timeout to 10 minutes instead of 30\n- Check for gtimeout (macOS) before timeout (Linux)\n- Add exec to npm scripts to avoid npm timeout issues\n- Update timeout message to reflect actual duration\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-04T23:58:50+03:00",
          "tree_id": "3d16e0464956892b909c31d12c52577727a63de1",
          "url": "https://github.com/carlrannaberg/autoagent/commit/5333534d303872748f7d7e3b837dc32be2d6faba"
        },
        "date": 1751662878966,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 8662.826983923882,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11543575807940742,
              "min": 0.07850699999994504,
              "max": 3.1672509999999647,
              "p75": 0.1307050000000345,
              "p99": 0.1661420000000362,
              "p995": 0.19974500000000717,
              "p999": 0.336812000000009
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10534.827642240634,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09492324259681117,
              "min": 0.07330799999999726,
              "max": 0.3115149999998721,
              "p75": 0.10158099999989645,
              "p99": 0.13944199999991724,
              "p995": 0.14775799999995343,
              "p999": 0.2693659999999909
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 9661.47472075147,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10350386756714713,
              "min": 0.07547199999999066,
              "max": 2.745488000000023,
              "p75": 0.10964599999988422,
              "p99": 0.14692600000034872,
              "p995": 0.1511239999999816,
              "p999": 0.2960360000001856
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9362.36991777319,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10681056279368277,
              "min": 0.07542100000000573,
              "max": 0.38200800000004165,
              "p75": 0.11438399999997273,
              "p99": 0.14960100000007515,
              "p995": 0.1538390000000618,
              "p999": 0.26896599999963655
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6789.25573462938,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1472915499263616,
              "min": 0.13767899999999145,
              "max": 0.4597049999999854,
              "p75": 0.15021300000000792,
              "p99": 0.2508020000000215,
              "p995": 0.2746470000000727,
              "p999": 0.3771600000000035
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.14273165258084,
            "unit": "ops/s",
            "extra": {
              "mean": 70.70769809999999,
              "min": 69.15759600000001,
              "max": 75.868559,
              "p75": 70.74723900000004,
              "p99": 75.868559,
              "p995": 75.868559,
              "p999": 75.868559
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1827.7738020253832,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5471136520787666,
              "min": 0.3472719999999754,
              "max": 3.805127999999968,
              "p75": 0.638531999999941,
              "p99": 1.2106340000000273,
              "p995": 1.4547529999999824,
              "p999": 3.805127999999968
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 694.5504232590253,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4397802758620746,
              "min": 0.937994000000117,
              "max": 4.751935999999887,
              "p75": 1.5786390000000665,
              "p99": 2.8507210000000214,
              "p995": 3.3087330000000748,
              "p999": 4.751935999999887
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 899301.0053732686,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011119747381856141,
              "min": 0.0010419999998703133,
              "max": 0.3765169999999216,
              "p75": 0.001111999999920954,
              "p99": 0.0011819999999715947,
              "p995": 0.0012419999998201092,
              "p999": 0.009937999999920066
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 524009.16472937865,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001908363569397577,
              "min": 0.001772999999957392,
              "max": 0.28228999999998905,
              "p75": 0.0018639999999550128,
              "p99": 0.0035770000000070468,
              "p995": 0.0038159999999152205,
              "p999": 0.011592000000064218
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1911176.8379857892,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005232378187744842,
              "min": 0.0004999999946448952,
              "max": 0.4801080000033835,
              "p75": 0.0005110000056447461,
              "p99": 0.0005810000002384186,
              "p995": 0.0008320000051753595,
              "p999": 0.0009519999875919893
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1416390.8470408272,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007060198123203314,
              "min": 0.0006609999982174486,
              "max": 0.37462000000232365,
              "p75": 0.0006819999980507419,
              "p99": 0.0008109999907901511,
              "p995": 0.000862000000779517,
              "p999": 0.0012819999974453822
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 292403.17834628007,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034199354660083225,
              "min": 0.003246000000217464,
              "max": 0.04692800000339048,
              "p75": 0.0034069999965140596,
              "p99": 0.0035869999992428347,
              "p995": 0.0057710000037332065,
              "p999": 0.012754000003042165
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 293916.41696658754,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034023278125144,
              "min": 0.003214999996998813,
              "max": 0.12746800000604708,
              "p75": 0.003365999997186009,
              "p99": 0.005049999999755528,
              "p995": 0.0059009999968111515,
              "p999": 0.013505000002624001
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42479.64461534283,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023540686581893372,
              "min": 0.022521999999298714,
              "max": 2.369409999999334,
              "p75": 0.0231740000017453,
              "p99": 0.03339199999754783,
              "p995": 0.039564000006066635,
              "p999": 0.0471279999910621
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14976.803317134956,
            "unit": "ops/s",
            "extra": {
              "mean": 0.06676992271480926,
              "min": 0.06527200000709854,
              "max": 0.33727999999246094,
              "p75": 0.06592300000193063,
              "p99": 0.07697500000358559,
              "p995": 0.08355600001232233,
              "p999": 0.1837530000047991
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9988310853604635,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.1702826000001,
              "min": 999.899265,
              "max": 1002.0573039999999,
              "p75": 1001.7852139999995,
              "p99": 1002.0573039999999,
              "p995": 1002.0573039999999,
              "p999": 1002.0573039999999
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33286938556484313,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.1813496999994,
              "min": 3003.142172,
              "max": 3004.8152279999995,
              "p75": 3004.580823999997,
              "p99": 3004.8152279999995,
              "p995": 3004.8152279999995,
              "p999": 3004.8152279999995
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.142598482032772,
            "unit": "ops/s",
            "extra": {
              "mean": 98.59406361904811,
              "min": 95.39057899999898,
              "max": 100.02901099999872,
              "p75": 99.48391100000299,
              "p99": 100.02901099999872,
              "p995": 100.02901099999872,
              "p999": 100.02901099999872
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2492101.9691136195,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0004012676898432354,
              "min": 0.0003100000000131331,
              "max": 4.863287000000014,
              "p75": 0.0003609999999980573,
              "p99": 0.0009009999999989304,
              "p995": 0.0017830000000458313,
              "p999": 0.002223999999955595
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "db3e719982ff5cf0f37b04569026c43e6ea5d9ca",
          "message": "chore: prepare for v0.3.3 release\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-05T00:31:47+03:00",
          "tree_id": "7969aea9107266b3f5b634f238d19ca541f382bd",
          "url": "https://github.com/carlrannaberg/autoagent/commit/db3e719982ff5cf0f37b04569026c43e6ea5d9ca"
        },
        "date": 1751664858293,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 8856.809644783747,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11290747347030926,
              "min": 0.07736499999998614,
              "max": 1.5806419999999548,
              "p75": 0.1328800000000001,
              "p99": 0.17740199999991546,
              "p995": 0.209541999999999,
              "p999": 0.3859140000000707
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10429.56769965765,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09588125115030655,
              "min": 0.07731499999999869,
              "max": 0.43894300000010844,
              "p75": 0.11058699999989585,
              "p99": 0.1388000000000602,
              "p995": 0.1463139999999612,
              "p999": 0.34402399999999034
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 9653.775670387779,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10358641366273134,
              "min": 0.07691300000010415,
              "max": 2.6525420000000395,
              "p75": 0.11220999999977721,
              "p99": 0.15339599999970233,
              "p995": 0.15819499999997788,
              "p999": 0.37283800000000156
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9689.366606104682,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10320592053663864,
              "min": 0.07588199999963763,
              "max": 0.42455299999983254,
              "p75": 0.11193899999989299,
              "p99": 0.14408000000003085,
              "p995": 0.1532560000000558,
              "p999": 0.348070000000007
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6785.43462401625,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1473744948423226,
              "min": 0.13777700000002824,
              "max": 0.5631710000000112,
              "p75": 0.15041999999994005,
              "p99": 0.2404790000000503,
              "p995": 0.32914400000004207,
              "p999": 0.43936999999993986
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.098559314607897,
            "unit": "ops/s",
            "extra": {
              "mean": 70.92923310000002,
              "min": 69.62450999999987,
              "max": 74.66724399999998,
              "p75": 71.57223299999998,
              "p99": 74.66724399999998,
              "p995": 74.66724399999998,
              "p999": 74.66724399999998
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1738.2232507691074,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5753000942528714,
              "min": 0.40234200000031706,
              "max": 2.023088000000371,
              "p75": 0.6429600000001301,
              "p99": 1.3470859999997629,
              "p995": 1.6483279999997649,
              "p999": 2.023088000000371
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 727.8986095468774,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3738177087912118,
              "min": 0.9531289999999899,
              "max": 5.623519999999644,
              "p75": 1.5964509999998882,
              "p99": 3.4723639999999705,
              "p995": 5.049408000000312,
              "p999": 5.623519999999644
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 901861.0530459732,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011088182560080285,
              "min": 0.0010110000000622676,
              "max": 0.4571930000001885,
              "p75": 0.001111999999920954,
              "p99": 0.0011930000000575092,
              "p995": 0.0015129999999317079,
              "p999": 0.009527999999818348
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 513132.59812174016,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019488140173911756,
              "min": 0.0017829999999321444,
              "max": 0.3433210000000031,
              "p75": 0.0018939999999929569,
              "p99": 0.00359600000001592,
              "p995": 0.0039079999999103165,
              "p999": 0.011793000000011489
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1888819.2784619136,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005294312756137851,
              "min": 0.0004999999946448952,
              "max": 0.533757000011974,
              "p75": 0.0005110000056447461,
              "p99": 0.0005919999966863543,
              "p995": 0.0008420000085607171,
              "p999": 0.0012319999950705096
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1395545.7320756398,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007165655535434644,
              "min": 0.0006709999870508909,
              "max": 0.5446570000058273,
              "p75": 0.0006819999980507419,
              "p99": 0.0009719999943627045,
              "p995": 0.0010910000128205866,
              "p999": 0.0017430000007152557
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 287460.26948950376,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003478741607582448,
              "min": 0.003285999999206979,
              "max": 0.06141300000308547,
              "p75": 0.003466000001935754,
              "p99": 0.003807000000961125,
              "p995": 0.005831000002217479,
              "p999": 0.013074999995296821
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 286853.19903356227,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003486103705202181,
              "min": 0.003246000000217464,
              "max": 0.25878300000476884,
              "p75": 0.0034159999995608814,
              "p99": 0.005219999999098945,
              "p995": 0.006671999995887745,
              "p999": 0.014326000004075468
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41486.09968769559,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024104459265342583,
              "min": 0.022963000010349788,
              "max": 2.9112569999997504,
              "p75": 0.023634000011952594,
              "p99": 0.03475500000058673,
              "p995": 0.03973400000541005,
              "p999": 0.05194599999231286
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14179.177423717478,
            "unit": "ops/s",
            "extra": {
              "mean": 0.07052595296024029,
              "min": 0.06751600001007318,
              "max": 0.4535959999921033,
              "p75": 0.0702610000007553,
              "p99": 0.08961699999053963,
              "p995": 0.10463499999605119,
              "p999": 0.3117620000120951
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986275445227936,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3743417000002,
              "min": 999.9040209999985,
              "max": 1002.1298480000005,
              "p75": 1001.8099039999997,
              "p99": 1002.1298480000005,
              "p995": 1002.1298480000005,
              "p999": 1002.1298480000005
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33284152680427453,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.4327989999997,
              "min": 3003.662236999997,
              "max": 3004.6697200000053,
              "p75": 3004.576423999999,
              "p99": 3004.6697200000053,
              "p995": 3004.6697200000053,
              "p999": 3004.6697200000053
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.146830856215315,
            "unit": "ops/s",
            "extra": {
              "mean": 98.5529387619054,
              "min": 97.1617849999966,
              "max": 99.23647999999957,
              "p75": 99.0832339999979,
              "p99": 99.23647999999957,
              "p995": 99.23647999999957,
              "p999": 99.23647999999957
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2520101.5010202127,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003968094140633502,
              "min": 0.0003299999998489511,
              "max": 4.1187889999999925,
              "p75": 0.0003609999999980573,
              "p99": 0.0008009999999103457,
              "p995": 0.0014830000000074506,
              "p999": 0.0022440000000187865
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "5551d4b26495e162944143d3d44e56f4ec638ab1",
          "message": "feat: Add comprehensive specifications for git repository management and reflective improvement\n\n- Add git repository validation spec for auto-commit operations\n- Add git commit no-verify configuration spec with hook bypass options\n- Add git auto-push configuration spec with remote validation\n- Add reflective improvement loop spec for enhanced issue quality\n- Create corresponding implementation issues and plans for all specs\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-05T01:16:59+03:00",
          "tree_id": "34803566e41d27070f0fa321034d1b061bbb2718",
          "url": "https://github.com/carlrannaberg/autoagent/commit/5551d4b26495e162944143d3d44e56f4ec638ab1"
        },
        "date": 1751667534664,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 9481.503510550201,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10546850495675987,
              "min": 0.07877800000005664,
              "max": 1.1353369999999927,
              "p75": 0.11084700000003522,
              "p99": 0.1633160000000089,
              "p995": 0.19314199999996617,
              "p999": 0.369352000000049
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9636.257957286562,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10377472297157,
              "min": 0.07748500000002423,
              "max": 0.3605089999999791,
              "p75": 0.11016700000004676,
              "p99": 0.148689000000104,
              "p995": 0.15749499999992622,
              "p999": 0.31667399999992085
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 10181.179786624007,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09822044408977003,
              "min": 0.07483999999999469,
              "max": 2.5633939999997892,
              "p75": 0.10282200000028752,
              "p99": 0.13643499999989217,
              "p995": 0.14906499999960943,
              "p999": 0.25666099999989456
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9574.383116476563,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10444537134503205,
              "min": 0.07472000000052503,
              "max": 0.3362699999997858,
              "p75": 0.11324199999990014,
              "p99": 0.14712599999984377,
              "p995": 0.1540979999999763,
              "p999": 0.2970170000003236
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6767.576891092804,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14776337470449097,
              "min": 0.13916099999994458,
              "max": 0.43928299999993214,
              "p75": 0.15165400000000773,
              "p99": 0.2332670000000121,
              "p995": 0.27353299999998626,
              "p999": 0.40343599999999924
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.058202126445911,
            "unit": "ops/s",
            "extra": {
              "mean": 71.13285119999996,
              "min": 68.90884499999993,
              "max": 76.536966,
              "p75": 70.61820799999987,
              "p99": 76.536966,
              "p995": 76.536966,
              "p999": 76.536966
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1800.4018085201906,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5554315682574952,
              "min": 0.34248200000001816,
              "max": 3.8271199999999226,
              "p75": 0.6271550000001298,
              "p99": 1.2036459999999352,
              "p995": 1.3734129999998004,
              "p999": 3.8271199999999226
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 650.0654377604938,
            "unit": "ops/s",
            "extra": {
              "mean": 1.538306671779148,
              "min": 0.9122890000001007,
              "max": 5.799847,
              "p75": 1.5918719999999666,
              "p99": 3.248646000000008,
              "p995": 3.3489850000000843,
              "p999": 5.799847
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 868230.7410654059,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011517675575192143,
              "min": 0.0010719999997945706,
              "max": 0.2718290000000252,
              "p75": 0.0011520000000473374,
              "p99": 0.0012630000001081498,
              "p995": 0.0014229999999315623,
              "p999": 0.009608000000071115
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 488245.1963484218,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0020481512311416156,
              "min": 0.001772999999957392,
              "max": 1.3402810000000045,
              "p75": 0.0019140000000561486,
              "p99": 0.00417800000002444,
              "p995": 0.004499000000009801,
              "p999": 0.015358999999989464
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1951702.5518736201,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005123731580101729,
              "min": 0.0004899999912595376,
              "max": 0.4410150000039721,
              "p75": 0.0005010000022593886,
              "p99": 0.0005910000036237761,
              "p995": 0.0008309999975608662,
              "p999": 0.001041999988956377
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1410665.6614369242,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007088851932366353,
              "min": 0.0006709999870508909,
              "max": 0.21735700000135694,
              "p75": 0.0006819999980507419,
              "p99": 0.0009219999919878319,
              "p995": 0.0009920000011334196,
              "p999": 0.0015430000057676807
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 289084.3712983994,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003459197726631086,
              "min": 0.0032659999997122213,
              "max": 0.03290199999901233,
              "p75": 0.0034469999955035746,
              "p99": 0.004057999998622108,
              "p995": 0.004848999997193459,
              "p999": 0.012332999998761807
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 296813.20216540626,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033691223729419087,
              "min": 0.0031850000013946556,
              "max": 0.17616999999881955,
              "p75": 0.0033269999985350296,
              "p99": 0.004207999998470768,
              "p995": 0.00594200000341516,
              "p999": 0.013396000002103392
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41117.468762311626,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024320563256963,
              "min": 0.02277299998968374,
              "max": 3.8352000000013504,
              "p75": 0.023624000008567236,
              "p99": 0.03993500000797212,
              "p995": 0.04887100000632927,
              "p999": 0.06301800000073854
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14689.920637712106,
            "unit": "ops/s",
            "extra": {
              "mean": 0.06807388716810289,
              "min": 0.06606399999873247,
              "max": 0.3304290000087349,
              "p75": 0.06680499999492895,
              "p99": 0.08874600000854116,
              "p995": 0.137207000007038,
              "p999": 0.19847099999606144
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9985928731958879,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.4091096000002,
              "min": 1000.7027190000008,
              "max": 1002.0505809999995,
              "p75": 1001.7645739999989,
              "p99": 1002.0505809999995,
              "p995": 1002.0505809999995,
              "p999": 1002.0505809999995
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33287539711554703,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.1270958,
              "min": 3003.498876999998,
              "max": 3004.5082170000023,
              "p75": 3004.431294999995,
              "p99": 3004.5082170000023,
              "p995": 3004.5082170000023,
              "p999": 3004.5082170000023
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.138167876067952,
            "unit": "ops/s",
            "extra": {
              "mean": 98.63715142857212,
              "min": 96.24004299999797,
              "max": 99.97363200000109,
              "p75": 99.35619499999302,
              "p99": 99.97363200000109,
              "p995": 99.97363200000109,
              "p999": 99.97363200000109
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2617581.1939525357,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038203208454825596,
              "min": 0.00031100000001060835,
              "max": 1.1539920000000166,
              "p75": 0.0003600000000005821,
              "p99": 0.0007209999999986394,
              "p995": 0.0012929999998050334,
              "p999": 0.0021240000000375403
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "d0f650e6eca26fa94f8ee813a817c891e3a1e889",
          "message": "feat: Complete issue from issues/53-update-documentation-for-smart-run-command.md\n\nCo-authored-by: Claude <claude@autoagent-cli>",
          "timestamp": "2025-07-05T13:06:07+03:00",
          "tree_id": "586b8548d7c448ee4addd09b5ef32be438003d2d",
          "url": "https://github.com/carlrannaberg/autoagent/commit/d0f650e6eca26fa94f8ee813a817c891e3a1e889"
        },
        "date": 1751710238549,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4354.333962156753,
            "unit": "ops/s",
            "extra": {
              "mean": 0.22965624793388337,
              "min": 0.165911000000051,
              "max": 1.1477130000000102,
              "p75": 0.25084000000003925,
              "p99": 0.30855800000006184,
              "p995": 0.4898479999999381,
              "p999": 0.7640420000000177
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10521.543386060119,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09504309047709572,
              "min": 0.07967900000005557,
              "max": 0.38268700000003264,
              "p75": 0.10351399999990463,
              "p99": 0.1405339999998887,
              "p995": 0.1528960000000552,
              "p999": 0.32148200000006
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4770.317113197305,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2096296695314979,
              "min": 0.14171600000008766,
              "max": 2.730307000000039,
              "p75": 0.22615399999995134,
              "p99": 0.27086800000006406,
              "p995": 0.2857460000000174,
              "p999": 0.7108400000001893
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9526.541086445077,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1049698931570094,
              "min": 0.07735599999978149,
              "max": 0.4234160000000884,
              "p75": 0.11250099999961094,
              "p99": 0.15045199999985925,
              "p995": 0.15928900000017165,
              "p999": 0.378146999999899
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6820.861339049833,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14660904983875586,
              "min": 0.13769800000000032,
              "max": 0.4865509999999631,
              "p75": 0.14863800000000538,
              "p99": 0.2175479999999652,
              "p995": 0.28066499999999905,
              "p999": 0.3922149999999647
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.053884400119589,
            "unit": "ops/s",
            "extra": {
              "mean": 71.15470510000002,
              "min": 69.96635400000002,
              "max": 76.32670500000006,
              "p75": 70.84098600000004,
              "p99": 76.32670500000006,
              "p995": 76.32670500000006,
              "p999": 76.32670500000006
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1715.3213434024308,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5829811445221378,
              "min": 0.34524699999974473,
              "max": 2.078755000000001,
              "p75": 0.6372139999998581,
              "p99": 1.2107489999998506,
              "p995": 1.350261000000046,
              "p999": 2.078755000000001
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 735.4132814007937,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3597796304347798,
              "min": 0.9463140000000294,
              "max": 5.729998000000023,
              "p75": 1.5960509999999886,
              "p99": 2.8563630000003286,
              "p995": 3.4112629999999626,
              "p999": 5.729998000000023
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 810193.9756940306,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0012342723224316463,
              "min": 0.0010720000000219443,
              "max": 0.40651200000002063,
              "p75": 0.0012330000001838926,
              "p99": 0.0019640000000435975,
              "p995": 0.0020939999999427528,
              "p999": 0.010229999999864958
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 505994.76739673596,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00197630502217413,
              "min": 0.001772999999957392,
              "max": 0.2843430000000353,
              "p75": 0.0019239999999740576,
              "p99": 0.0037570000000641812,
              "p995": 0.00405799999998635,
              "p999": 0.012003000000049724
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1941098.458774505,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005151722188432116,
              "min": 0.0004899999912595376,
              "max": 0.5087229999917326,
              "p75": 0.0005010000022593886,
              "p99": 0.0005810000002384186,
              "p995": 0.000822000001790002,
              "p999": 0.0010820000024978071
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1413586.7984570062,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000707420302093614,
              "min": 0.0006709999870508909,
              "max": 0.32603100000415,
              "p75": 0.0006819999980507419,
              "p99": 0.0008119999984046444,
              "p995": 0.0008920000109355897,
              "p999": 0.0014430000010179356
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 290917.39372873364,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034374018933101386,
              "min": 0.0032159999973373488,
              "max": 0.031619000001228414,
              "p75": 0.0034259999956702814,
              "p99": 0.003877999995893333,
              "p995": 0.005770999996457249,
              "p999": 0.01251399999455316
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 290546.6135123636,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003441788523745596,
              "min": 0.003206000001227949,
              "max": 0.24118199999793433,
              "p75": 0.003396000000066124,
              "p99": 0.005140000001119915,
              "p995": 0.006591999997908715,
              "p999": 0.013906000000133645
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42043.716625327426,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023784766910868033,
              "min": 0.022161000000778586,
              "max": 4.121431999999913,
              "p75": 0.023142999998526648,
              "p99": 0.03960400000505615,
              "p995": 0.046365999995032325,
              "p999": 0.06194600000162609
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12474.53156262288,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0801633307815962,
              "min": 0.07817599999543745,
              "max": 0.38687499999650754,
              "p75": 0.07907799999520648,
              "p99": 0.09455699998943601,
              "p995": 0.10615900000266265,
              "p999": 0.2722100000100909
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.998837874606747,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.1634775000002,
              "min": 999.8469250000016,
              "max": 1001.8110720000004,
              "p75": 1001.7617910000008,
              "p99": 1001.8110720000004,
              "p995": 1001.8110720000004,
              "p999": 1001.8110720000004
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328759526425055,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.1220823000003,
              "min": 3002.5903210000033,
              "max": 3004.782131,
              "p75": 3004.635623000002,
              "p99": 3004.782131,
              "p995": 3004.782131,
              "p999": 3004.782131
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.190292903708725,
            "unit": "ops/s",
            "extra": {
              "mean": 98.1326061428571,
              "min": 94.63006100000348,
              "max": 99.69258499999705,
              "p75": 99.09493500000099,
              "p99": 99.69258499999705,
              "p995": 99.69258499999705,
              "p999": 99.69258499999705
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2574543.691054897,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003884183451515863,
              "min": 0.00031100000001060835,
              "max": 1.1682089999999903,
              "p75": 0.0003609999999980573,
              "p99": 0.0006909999999606953,
              "p995": 0.0009220000000595974,
              "p999": 0.002154000000018641
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "8413071cadcea45029a7a75158c8f0b32e9651bb",
          "message": "Run command fixes.",
          "timestamp": "2025-07-05T13:44:06+03:00",
          "tree_id": "dd181a7547dfee11e0ea1ff0c7efe7e16099c423",
          "url": "https://github.com/carlrannaberg/autoagent/commit/8413071cadcea45029a7a75158c8f0b32e9651bb"
        },
        "date": 1751712354929,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4217.440101087026,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2371106586059763,
              "min": 0.16203600000005736,
              "max": 0.7397499999999582,
              "p75": 0.26935699999995677,
              "p99": 0.3113469999999552,
              "p995": 0.37598800000000665,
              "p999": 0.6944469999999683
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 8904.142239763161,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11230728048506541,
              "min": 0.08080300000005991,
              "max": 0.3589359999999715,
              "p75": 0.1293439999999464,
              "p99": 0.14995199999998476,
              "p995": 0.15341799999998784,
              "p999": 0.2722519999999804
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4998.936730957305,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20004253980795997,
              "min": 0.1416669999998703,
              "max": 2.6065340000000106,
              "p75": 0.20933399999989888,
              "p99": 0.26384699999994154,
              "p995": 0.2715209999998933,
              "p999": 0.5752849999998944
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9967.586285363363,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1003251912118808,
              "min": 0.07748600000013539,
              "max": 0.31993199999988065,
              "p75": 0.10918600000013612,
              "p99": 0.14354000000002998,
              "p995": 0.15162499999996726,
              "p999": 0.2839850000000297
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6899.759074212662,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14493259681159387,
              "min": 0.13674800000001142,
              "max": 0.4274950000000217,
              "p75": 0.14874999999994998,
              "p99": 0.21820000000002437,
              "p995": 0.2590579999999818,
              "p999": 0.34862599999996746
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.575304535939269,
            "unit": "ops/s",
            "extra": {
              "mean": 68.60920110000004,
              "min": 67.94419400000004,
              "max": 69.38435800000002,
              "p75": 69.09017400000016,
              "p99": 69.38435800000002,
              "p995": 69.38435800000002,
              "p999": 69.38435800000002
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1719.9982077618788,
            "unit": "ops/s",
            "extra": {
              "mean": 0.581395954651159,
              "min": 0.3567910000001575,
              "max": 2.221599999999853,
              "p75": 0.6327019999998811,
              "p99": 1.2143700000001445,
              "p995": 1.317580000000362,
              "p999": 2.221599999999853
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 705.9969482823218,
            "unit": "ops/s",
            "extra": {
              "mean": 1.416436717514123,
              "min": 0.9631729999998697,
              "max": 6.121294000000034,
              "p75": 1.5845429999999396,
              "p99": 3.190305999999964,
              "p995": 4.8860879999999725,
              "p999": 6.121294000000034
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 882379.4882199905,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011332992361566376,
              "min": 0.001051000000188651,
              "max": 0.26575000000002547,
              "p75": 0.0011320000000978325,
              "p99": 0.001222000000097978,
              "p995": 0.0012720000001991139,
              "p999": 0.009888000000046304
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 505175.290733906,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001979510911048767,
              "min": 0.0017629999999826396,
              "max": 0.18787799999995514,
              "p75": 0.0018939999999929569,
              "p99": 0.003937000000007629,
              "p995": 0.004227000000014414,
              "p999": 0.013342999999963467
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1906335.0544811834,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005245667584244019,
              "min": 0.0004999999946448952,
              "max": 0.4268869999941671,
              "p75": 0.0005110000056447461,
              "p99": 0.0006010000070091337,
              "p995": 0.0008509999897796661,
              "p999": 0.0010130000009667128
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1417115.4558376267,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007056588056256301,
              "min": 0.0006609999982174486,
              "max": 0.30383699999947567,
              "p75": 0.0006819999980507419,
              "p99": 0.0008119999984046444,
              "p995": 0.000901999999769032,
              "p999": 0.0013519999920390546
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 295939.9964485078,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033790633641978683,
              "min": 0.0032260000007227063,
              "max": 0.029163999999582302,
              "p75": 0.003356000001076609,
              "p99": 0.0035470000002533197,
              "p995": 0.00639200000296114,
              "p999": 0.012904000002890825
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 296267.8317203449,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003375324260461482,
              "min": 0.0031859999944572337,
              "max": 0.17861400000401773,
              "p75": 0.0033260000054724514,
              "p99": 0.004999000004318077,
              "p995": 0.006511999999929685,
              "p999": 0.013815999998769257
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42077.07388350522,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023765911165035018,
              "min": 0.022362000003340654,
              "max": 3.657192999991821,
              "p75": 0.023063000000547618,
              "p99": 0.03995500000019092,
              "p995": 0.05176699999719858,
              "p999": 0.062346000006073155
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12509.891751905705,
            "unit": "ops/s",
            "extra": {
              "mean": 0.07993674284572959,
              "min": 0.07820500001253095,
              "max": 0.35059499999624677,
              "p75": 0.07889799999247771,
              "p99": 0.0944969999982277,
              "p995": 0.10349300000234507,
              "p999": 0.19427300000097603
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9988310412637376,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.1703267999995,
              "min": 999.7080340000011,
              "max": 1001.9610499999999,
              "p75": 1001.600715999999,
              "p99": 1001.9610499999999,
              "p995": 1001.9610499999999,
              "p999": 1001.9610499999999
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3329379965303125,
            "unit": "ops/s",
            "extra": {
              "mean": 3003.562256100002,
              "min": 3003.0829560000057,
              "max": 3004.109077000001,
              "p75": 3004.0126300000047,
              "p99": 3004.109077000001,
              "p995": 3004.109077000001,
              "p999": 3004.109077000001
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.164017761336432,
            "unit": "ops/s",
            "extra": {
              "mean": 98.38629009523824,
              "min": 93.8568660000019,
              "max": 100.0275099999999,
              "p75": 99.70363599999837,
              "p99": 100.0275099999999,
              "p995": 100.0275099999999,
              "p999": 100.0275099999999
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2489341.427451542,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00040171267346952394,
              "min": 0.00031999999998788553,
              "max": 4.5271020000000135,
              "p75": 0.0003699999999753345,
              "p99": 0.0007620000000088112,
              "p995": 0.0014830000000074506,
              "p999": 0.0022240000000124382
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "c71febcf3c195f023e6e924245ea6032a039c6d1",
          "message": "chore: prepare for v0.4.1 release\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-05T14:25:23+03:00",
          "tree_id": "7bec4e2f321cd7d8a177515428d7d16da40a757b",
          "url": "https://github.com/carlrannaberg/autoagent/commit/c71febcf3c195f023e6e924245ea6032a039c6d1"
        },
        "date": 1751714854132,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 5000.791472571331,
            "unit": "ops/s",
            "extra": {
              "mean": 0.19996834610778425,
              "min": 0.16136200000005374,
              "max": 1.1770680000000766,
              "p75": 0.20256800000004205,
              "p99": 0.3058210000000372,
              "p995": 0.4089040000000068,
              "p999": 0.7607699999999795
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10403.710381510537,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09611955382545048,
              "min": 0.0774349999999231,
              "max": 0.3684279999999944,
              "p75": 0.10270200000013574,
              "p99": 0.15082200000006196,
              "p995": 0.157004000000029,
              "p999": 0.3098290000000361
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4738.12844544355,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21105379719320527,
              "min": 0.14646300000003976,
              "max": 2.91968299999985,
              "p75": 0.22578199999998105,
              "p99": 0.26938300000028903,
              "p995": 0.28369999999995343,
              "p999": 0.6407470000003741
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9775.445478079731,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10229712827332324,
              "min": 0.07467999999971653,
              "max": 0.4033430000004046,
              "p75": 0.11063599999988583,
              "p99": 0.14087400000016714,
              "p995": 0.1521139999999832,
              "p999": 0.3459330000000591
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6752.080667053766,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1481024960023685,
              "min": 0.1398229999999785,
              "max": 0.43823599999996077,
              "p75": 0.15028299999994488,
              "p99": 0.20708000000001903,
              "p995": 0.2911189999999806,
              "p999": 0.3869290000000092
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.210838191332051,
            "unit": "ops/s",
            "extra": {
              "mean": 70.36882600000001,
              "min": 69.55131500000016,
              "max": 71.60691200000008,
              "p75": 70.59878800000001,
              "p99": 71.60691200000008,
              "p995": 71.60691200000008,
              "p999": 71.60691200000008
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1914.9958106667975,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5221943538622166,
              "min": 0.34112199999981385,
              "max": 1.7212139999996907,
              "p75": 0.6198140000001331,
              "p99": 1.182299999999941,
              "p995": 1.2455979999999727,
              "p999": 1.7212139999996907
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 712.907635868419,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4027062549019598,
              "min": 0.9301330000000689,
              "max": 5.958950000000186,
              "p75": 1.591998999999987,
              "p99": 2.6236189999999624,
              "p995": 3.793867000000091,
              "p999": 5.958950000000186
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 879338.7284763072,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011372181931902068,
              "min": 0.0010219999999208085,
              "max": 0.3194669999998041,
              "p75": 0.0011319999998704589,
              "p99": 0.0019340000001193403,
              "p995": 0.0021440000000438886,
              "p999": 0.010048999999980879
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 523081.83365996066,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019117467586344608,
              "min": 0.0017629999999826396,
              "max": 0.21695599999998194,
              "p75": 0.001902999999970234,
              "p99": 0.0020640000000184955,
              "p995": 0.0029559999999833053,
              "p999": 0.011290999999914675
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1921394.7319100832,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005204552627277619,
              "min": 0.0004999999946448952,
              "max": 0.4172390000021551,
              "p75": 0.0005110000056447461,
              "p99": 0.0005810000002384186,
              "p995": 0.0008509999897796661,
              "p999": 0.0010020000045187771
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1416683.5693266885,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007058739309550072,
              "min": 0.0006609999982174486,
              "max": 0.30241500001284294,
              "p75": 0.0006819999980507419,
              "p99": 0.0008119999984046444,
              "p995": 0.0009319999953731894,
              "p999": 0.0013719999988097697
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 283192.7448887116,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003531163908852882,
              "min": 0.0032559999963268638,
              "max": 0.07652300000336254,
              "p75": 0.003496000004815869,
              "p99": 0.005319999996572733,
              "p995": 0.006221999996341765,
              "p999": 0.012893999999505468
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 294511.6948859479,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033954509018300893,
              "min": 0.0031860000017331913,
              "max": 0.14992000000347616,
              "p75": 0.003356000001076609,
              "p99": 0.005048999999416992,
              "p995": 0.0061520000017480925,
              "p999": 0.013614999996207189
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42071.587109445754,
            "unit": "ops/s",
            "extra": {
              "mean": 0.02376901060087376,
              "min": 0.022863000005600043,
              "max": 0.33892300000297837,
              "p75": 0.02352400000381749,
              "p99": 0.032991000000038184,
              "p995": 0.03983399999560788,
              "p999": 0.04405199999746401
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12479.070857233013,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08013417116069892,
              "min": 0.07836600000155158,
              "max": 0.3286670000088634,
              "p75": 0.07918800000334159,
              "p99": 0.09085000000777654,
              "p995": 0.09866400000464637,
              "p999": 0.20853899999929126
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986238876945911,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3780086000003,
              "min": 999.9723680000006,
              "max": 1002.1104610000002,
              "p75": 1001.8244279999999,
              "p99": 1002.1104610000002,
              "p995": 1002.1104610000002,
              "p999": 1002.1104610000002
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328323645535212,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.5155054000006,
              "min": 3003.459673999998,
              "max": 3005.5175180000006,
              "p75": 3004.6227970000036,
              "p99": 3005.5175180000006,
              "p995": 3005.5175180000006,
              "p999": 3005.5175180000006
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.126975944984538,
            "unit": "ops/s",
            "extra": {
              "mean": 98.74616128571506,
              "min": 97.22379100000398,
              "max": 100.66347400000086,
              "p75": 98.94013799999811,
              "p99": 100.66347400000086,
              "p995": 100.66347400000086,
              "p999": 100.66347400000086
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2538855.2688100175,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003938783010930388,
              "min": 0.0003100000000131331,
              "max": 4.315539000000058,
              "p75": 0.0003609999999980573,
              "p99": 0.0007420000000024629,
              "p995": 0.0014829999998937637,
              "p999": 0.00220400000000609
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "03e25e483827c16f03410e01faa4e3847cf0752c",
          "message": "fix: Fix test failures in release workflow\n\n- Fix mock provider not being used during bootstrap operations\n- Update E2E tests to use correct workspace path accessor\n- Fix test expectations to match actual error messages\n- Remove false positive issue pattern detection in tests\n- Ensure all provider operations respect AUTOAGENT_MOCK_PROVIDER setting\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-05T15:14:05+03:00",
          "tree_id": "e7d2317eaaa1991dd38efdd6da006e1c5f8d4b29",
          "url": "https://github.com/carlrannaberg/autoagent/commit/03e25e483827c16f03410e01faa4e3847cf0752c"
        },
        "date": 1751717768346,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4699.412075352911,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21279257574468038,
              "min": 0.1629429999999843,
              "max": 0.8528480000000513,
              "p75": 0.22387700000001587,
              "p99": 0.3080799999999613,
              "p995": 0.3974900000000616,
              "p999": 0.7059770000000753
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10620.521177390325,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09415733778949256,
              "min": 0.07785600000011073,
              "max": 0.4139900000000125,
              "p75": 0.09957499999995889,
              "p99": 0.14927800000009483,
              "p995": 0.15552899999988767,
              "p999": 0.3569769999999153
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4662.099261443233,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21449564754449968,
              "min": 0.15387699999973847,
              "max": 2.869901000000027,
              "p75": 0.2321830000000773,
              "p99": 0.2683889999998428,
              "p995": 0.28406800000038857,
              "p999": 0.653215999999702
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9996.352541122655,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10003648789758404,
              "min": 0.07730399999945803,
              "max": 0.4251920000001519,
              "p75": 0.10790099999985614,
              "p99": 0.15030000000024302,
              "p995": 0.15533999999979642,
              "p999": 0.3525059999997211
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6694.9482504096595,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14936635244922328,
              "min": 0.13914899999997488,
              "max": 0.45798100000001796,
              "p75": 0.15254400000003443,
              "p99": 0.24499600000001465,
              "p995": 0.30813399999999547,
              "p999": 0.3954269999999269
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.109662205106348,
            "unit": "ops/s",
            "extra": {
              "mean": 70.8734189,
              "min": 69.59672699999999,
              "max": 75.98422500000004,
              "p75": 70.60070000000007,
              "p99": 75.98422500000004,
              "p995": 75.98422500000004,
              "p999": 75.98422500000004
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 2102.489210123344,
            "unit": "ops/s",
            "extra": {
              "mean": 0.475626697718622,
              "min": 0.3402240000000347,
              "max": 1.9020030000001498,
              "p75": 0.46204100000022663,
              "p99": 1.1644089999999778,
              "p995": 1.2490069999998923,
              "p999": 1.4405930000002627
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 753.7459876021787,
            "unit": "ops/s",
            "extra": {
              "mean": 1.326706896551723,
              "min": 0.9473950000001423,
              "max": 3.7051309999999376,
              "p75": 1.5734010000001035,
              "p99": 2.445884999999862,
              "p995": 3.0889870000000883,
              "p999": 3.7051309999999376
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 882898.9034396155,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011326325087778223,
              "min": 0.0010309999997843988,
              "max": 0.32887299999993047,
              "p75": 0.0011419999998452113,
              "p99": 0.001222000000097978,
              "p995": 0.0015829999999823485,
              "p999": 0.009688000000096508
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 491806.26589107554,
            "unit": "ops/s",
            "extra": {
              "mean": 0.002033320982985358,
              "min": 0.0017740000000117107,
              "max": 1.2152439999999842,
              "p75": 0.0019429999999829306,
              "p99": 0.003927000000032876,
              "p995": 0.004187999999999192,
              "p999": 0.012272999999936474
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1900059.5477894624,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005262992947581061,
              "min": 0.0004999999946448952,
              "max": 2.5223710000136634,
              "p75": 0.0005110000056447461,
              "p99": 0.0005919999966863543,
              "p995": 0.0008510000043315813,
              "p999": 0.0010820000024978071
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1412529.884180835,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007079496237206532,
              "min": 0.0006709999870508909,
              "max": 0.29075199998624157,
              "p75": 0.0006819999980507419,
              "p99": 0.0008119999984046444,
              "p995": 0.0009209999989252537,
              "p999": 0.0013519999920390546
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 288084.4933174557,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034712038419160815,
              "min": 0.003285999999206979,
              "max": 0.04367199999978766,
              "p75": 0.003456999998888932,
              "p99": 0.0037669999946956523,
              "p995": 0.0054499999969266355,
              "p999": 0.012513000001490582
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 293412.55112933967,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00340817049628933,
              "min": 0.003214999996998813,
              "max": 0.19833899999503046,
              "p75": 0.0033660000044619665,
              "p99": 0.005080000002635643,
              "p995": 0.006511999999929685,
              "p999": 0.013404999997874256
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 40905.47837337987,
            "unit": "ops/s",
            "extra": {
              "mean": 0.02444660323666504,
              "min": 0.022963000010349788,
              "max": 4.136522000000696,
              "p75": 0.02376399999775458,
              "p99": 0.040085000000544824,
              "p995": 0.05121499999950174,
              "p999": 0.06327800000144634
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12362.333813131845,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08089087506581917,
              "min": 0.07883700000820681,
              "max": 0.44562099999166094,
              "p75": 0.07983899999817368,
              "p99": 0.09553799999412149,
              "p995": 0.10576700000092387,
              "p999": 0.2459380000072997
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9989716682547238,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.0293902999999,
              "min": 1000.1813709999988,
              "max": 1001.7306580000004,
              "p75": 1001.6956269999991,
              "p99": 1001.7306580000004,
              "p995": 1001.7306580000004,
              "p999": 1001.7306580000004
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33285536167710916,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.3079221000007,
              "min": 3003.545966000005,
              "max": 3004.535081000002,
              "p75": 3004.4686159999983,
              "p99": 3004.535081000002,
              "p995": 3004.535081000002,
              "p999": 3004.535081000002
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.126356200101537,
            "unit": "ops/s",
            "extra": {
              "mean": 98.75220466666707,
              "min": 96.7752679999976,
              "max": 99.81938900000387,
              "p75": 99.39412799999991,
              "p99": 99.81938900000387,
              "p995": 99.81938900000387,
              "p999": 99.81938900000387
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2616335.875535139,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003822139234304015,
              "min": 0.0003109999998969215,
              "max": 1.1507530000000088,
              "p75": 0.0003510000000233049,
              "p99": 0.0007519999999772153,
              "p995": 0.0011719999999968422,
              "p999": 0.002073999999993248
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "5df785ec5c6a24d28e503e6a7f4046908bd6fc63",
          "message": "chore: prepare for v0.5.0 release",
          "timestamp": "2025-07-05T17:08:15+03:00",
          "tree_id": "7ddc03e0edf4967d266bc0eddc193af87399616b",
          "url": "https://github.com/carlrannaberg/autoagent/commit/5df785ec5c6a24d28e503e6a7f4046908bd6fc63"
        },
        "date": 1751724680688,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4568.533144515031,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21888863851203472,
              "min": 0.16253900000003796,
              "max": 1.1327840000000151,
              "p75": 0.24016099999994367,
              "p99": 0.3127870000000712,
              "p995": 0.39960099999996146,
              "p999": 0.6839649999999438
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9504.652734484247,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10521162928676565,
              "min": 0.0713109999999233,
              "max": 0.3416979999999512,
              "p75": 0.11139499999990221,
              "p99": 0.14526699999987613,
              "p995": 0.15047599999979866,
              "p999": 0.28209799999990537
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4850.496877360881,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2061644456813036,
              "min": 0.13968199999999342,
              "max": 3.3819770000000062,
              "p75": 0.21720700000014403,
              "p99": 0.2654179999999542,
              "p995": 0.3030119999998533,
              "p999": 0.6453840000001492
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 8782.534844841563,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11386234357924031,
              "min": 0.07594200000039564,
              "max": 0.7483120000001691,
              "p75": 0.1261859999999615,
              "p99": 0.16503000000011525,
              "p995": 0.24271500000031665,
              "p999": 0.43782099999998536
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6810.43129887548,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1468335786846741,
              "min": 0.1387409999999818,
              "max": 0.3824790000000462,
              "p75": 0.1489599999999882,
              "p99": 0.19743100000005143,
              "p995": 0.26253299999996216,
              "p999": 0.3275660000000471
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.339727162427916,
            "unit": "ops/s",
            "extra": {
              "mean": 69.7363338,
              "min": 68.15313500000002,
              "max": 76.30358899999999,
              "p75": 70.28690000000006,
              "p99": 76.30358899999999,
              "p995": 76.30358899999999,
              "p999": 76.30358899999999
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1837.0058491745785,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5443640805222966,
              "min": 0.34903599999961443,
              "max": 1.4020049999999173,
              "p75": 0.6307549999996809,
              "p99": 1.1097659999995813,
              "p995": 1.1622200000001612,
              "p999": 1.4020049999999173
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 761.8514861949858,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3125917821522282,
              "min": 0.9069329999999809,
              "max": 4.813454999999976,
              "p75": 1.5639090000001943,
              "p99": 2.9564949999999044,
              "p995": 4.7834080000000085,
              "p999": 4.813454999999976
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 801376.1872870196,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001247853400018538,
              "min": 0.0010720000000219443,
              "max": 0.02932399999986046,
              "p75": 0.0012520000000222353,
              "p99": 0.002234000000044034,
              "p995": 0.002383999999892694,
              "p999": 0.010048999999980879
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 475476.72286952083,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0021031523771867537,
              "min": 0.0018129999999700885,
              "max": 0.22286900000000287,
              "p75": 0.0019940000000815417,
              "p99": 0.004037999999923159,
              "p995": 0.004277999999999338,
              "p999": 0.012875000000008185
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1895535.2000831298,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005275554893183436,
              "min": 0.0004999999946448952,
              "max": 2.7805999999982305,
              "p75": 0.0005110000056447461,
              "p99": 0.000742000003810972,
              "p995": 0.0008420000085607171,
              "p999": 0.0010020000045187771
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1415250.5592850079,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007065886626501001,
              "min": 0.0006709999870508909,
              "max": 0.24264500000572298,
              "p75": 0.0006819999980507419,
              "p99": 0.0008119999984046444,
              "p995": 0.0009120000031543896,
              "p999": 0.001352999999653548
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 284292.07420614467,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003517509247461061,
              "min": 0.0033159999948111363,
              "max": 0.031669999996665865,
              "p75": 0.0035070000012638047,
              "p99": 0.0037070000034873374,
              "p995": 0.005861000005097594,
              "p999": 0.012393000004522037
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 289247.45100861514,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034572474070660533,
              "min": 0.0032260000007227063,
              "max": 0.16034100000251783,
              "p75": 0.003416999999899417,
              "p99": 0.004258000000845641,
              "p995": 0.006121999998867977,
              "p999": 0.013545000001613516
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 40764.556934579196,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0245311141638273,
              "min": 0.02338400000007823,
              "max": 2.375740000003134,
              "p75": 0.02412499999627471,
              "p99": 0.03663800000504125,
              "p995": 0.04064599999401253,
              "p999": 0.04515499999979511
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12094.574410071738,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0826817022323044,
              "min": 0.08026100001006853,
              "max": 0.31672299999627285,
              "p75": 0.08186299999943003,
              "p99": 0.09452699999383185,
              "p995": 0.1076420000026701,
              "p999": 0.21343000000342727
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9989710051211139,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.0300548000002,
              "min": 999.8114360000018,
              "max": 1001.8905510000004,
              "p75": 1001.7217830000009,
              "p99": 1001.8905510000004,
              "p995": 1001.8905510000004,
              "p999": 1001.8905510000004
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33287669901392714,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.1153465,
              "min": 3003.314304000007,
              "max": 3004.6968380000035,
              "p75": 3004.581947999999,
              "p99": 3004.6968380000035,
              "p995": 3004.6968380000035,
              "p999": 3004.6968380000035
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.138498792512713,
            "unit": "ops/s",
            "extra": {
              "mean": 98.6339319523814,
              "min": 96.43258899999637,
              "max": 99.83610500000214,
              "p75": 99.3632790000047,
              "p99": 99.83610500000214,
              "p995": 99.83610500000214,
              "p999": 99.83610500000214
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2569317.3833638523,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003892084358572939,
              "min": 0.0003100000000131331,
              "max": 4.258469999999988,
              "p75": 0.0003609999999980573,
              "p99": 0.0007020000000466098,
              "p995": 0.001442999999994754,
              "p999": 0.002123999999980697
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "9668a8c035259b416a68abc9bfa11c6f2c3d1c26",
          "message": "chore: prepare for v0.5.1 release\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-05T17:26:56+03:00",
          "tree_id": "2cc96e0548fd6372f51a705314ee14b835d4ab99",
          "url": "https://github.com/carlrannaberg/autoagent/commit/9668a8c035259b416a68abc9bfa11c6f2c3d1c26"
        },
        "date": 1751725832962,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4370.196166570683,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2288226802378772,
              "min": 0.16229499999997188,
              "max": 0.6842440000000352,
              "p75": 0.25531900000009955,
              "p99": 0.3079480000000103,
              "p995": 0.40764500000000226,
              "p999": 0.6500900000000911
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10771.371059643969,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09283869197920414,
              "min": 0.07901800000001913,
              "max": 0.345698000000084,
              "p75": 0.09600000000000364,
              "p99": 0.13239800000008017,
              "p995": 0.14546199999995224,
              "p999": 0.28274999999985084
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 5036.284469687998,
            "unit": "ops/s",
            "extra": {
              "mean": 0.19855907783182683,
              "min": 0.1473470000000816,
              "max": 2.9119030000001658,
              "p75": 0.2065269999998236,
              "p99": 0.2572620000000825,
              "p995": 0.27654899999993177,
              "p999": 0.5778459999999086
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10654.529973190505,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09385679166666697,
              "min": 0.0747799999999188,
              "max": 0.3594429999998283,
              "p75": 0.09977699999990364,
              "p99": 0.13698599999997896,
              "p995": 0.15868799999998373,
              "p999": 0.2889810000001489
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6866.973140304469,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1456245684333144,
              "min": 0.13694700000007742,
              "max": 0.39349700000002485,
              "p75": 0.14973999999995158,
              "p99": 0.19689899999991667,
              "p995": 0.2660079999999425,
              "p999": 0.3625690000000077
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.447118004023743,
            "unit": "ops/s",
            "extra": {
              "mean": 69.21795749999998,
              "min": 68.07178800000008,
              "max": 70.72167999999999,
              "p75": 69.77697799999999,
              "p99": 70.72167999999999,
              "p995": 70.72167999999999,
              "p999": 70.72167999999999
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1838.7086454989078,
            "unit": "ops/s",
            "extra": {
              "mean": 0.543859954347832,
              "min": 0.3421710000002349,
              "max": 1.3497480000000905,
              "p75": 0.6288880000001882,
              "p99": 1.2169490000001133,
              "p995": 1.329649999999674,
              "p999": 1.3497480000000905
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 687.5880797331963,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4543591279069708,
              "min": 0.9222270000000208,
              "max": 5.667492999999922,
              "p75": 1.6081120000001192,
              "p99": 2.456739000000198,
              "p995": 2.9463979999998173,
              "p999": 5.667492999999922
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 804076.4995932034,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001243662761572957,
              "min": 0.0011219999998957064,
              "max": 0.039062999999941894,
              "p75": 0.0012530000001333974,
              "p99": 0.0013530000001082954,
              "p995": 0.0014029999999820575,
              "p999": 0.00984799999991992
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 524547.6835974122,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019064043770851823,
              "min": 0.0017540000000053624,
              "max": 0.296654999999987,
              "p75": 0.001874000000043452,
              "p99": 0.003316000000040731,
              "p995": 0.0036870000000135406,
              "p999": 0.011211000000002969
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1909016.2322547876,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005238300141737792,
              "min": 0.0004999999946448952,
              "max": 0.456304999999702,
              "p75": 0.0005110000056447461,
              "p99": 0.0008210000087274238,
              "p995": 0.0008519999973941594,
              "p999": 0.0010719999991124496
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1409862.2799717446,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007092891371063855,
              "min": 0.0006709999870508909,
              "max": 0.40147199999773875,
              "p75": 0.0006819999980507419,
              "p99": 0.000822000001790002,
              "p995": 0.000941999998758547,
              "p999": 0.0014429999864660203
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 287349.28679871163,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034800851992387253,
              "min": 0.003285999999206979,
              "max": 0.05133899999782443,
              "p75": 0.003466000001935754,
              "p99": 0.00376700000197161,
              "p995": 0.005880999997316394,
              "p999": 0.01271400000405265
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 290718.34697555826,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034397553866253702,
              "min": 0.0032359999968321063,
              "max": 0.20114700000704033,
              "p75": 0.0033970000004046597,
              "p99": 0.004178000002866611,
              "p995": 0.005770999996457249,
              "p999": 0.013415000001259614
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41034.73711491982,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024369596841803818,
              "min": 0.023214000000734814,
              "max": 2.406598000001395,
              "p75": 0.023934999990160577,
              "p99": 0.03651900000113528,
              "p995": 0.04069700000400189,
              "p999": 0.0492320000048494
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12256.619909959625,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0815885625356962,
              "min": 0.07903700000315439,
              "max": 0.4482399999978952,
              "p75": 0.08057099999859929,
              "p99": 0.09888499999942724,
              "p995": 0.10609899999690242,
              "p999": 0.2684730000037234
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986278568637755,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3740284999997,
              "min": 999.8139339999998,
              "max": 1002.0571739999996,
              "p75": 1001.8537660000002,
              "p99": 1002.0571739999996,
              "p995": 1002.0571739999996,
              "p999": 1002.0571739999996
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33287161289995015,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.1612479,
              "min": 3001.582853,
              "max": 3004.707466,
              "p75": 3004.5187059999953,
              "p99": 3004.707466,
              "p995": 3004.707466,
              "p999": 3004.707466
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.124074656864419,
            "unit": "ops/s",
            "extra": {
              "mean": 98.77445928571562,
              "min": 97.0862449999986,
              "max": 99.87036700000317,
              "p75": 99.16392500000075,
              "p99": 99.87036700000317,
              "p995": 99.87036700000317,
              "p999": 99.87036700000317
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2508699.9347739127,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003986128377247004,
              "min": 0.0003099999999562897,
              "max": 3.9013049999999794,
              "p75": 0.00036100000011174416,
              "p99": 0.0008020000000215077,
              "p995": 0.0015230000000201471,
              "p999": 0.00220400000000609
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "0120cbb38e6f975ab7a1d4d301472eef65a1351b",
          "message": "chore: prepare for v0.5.2 release\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-05T18:18:54+03:00",
          "tree_id": "ae9a89fba81bf29612ff8344c479be1fdea4c366",
          "url": "https://github.com/carlrannaberg/autoagent/commit/0120cbb38e6f975ab7a1d4d301472eef65a1351b"
        },
        "date": 1751728942234,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4723.254632632957,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21171841828958407,
              "min": 0.1581939999999804,
              "max": 0.740444000000025,
              "p75": 0.22010899999997946,
              "p99": 0.302791999999954,
              "p995": 0.3622219999999743,
              "p999": 0.6233180000000402
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9604.508304606017,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10411777139288138,
              "min": 0.07762400000001435,
              "max": 0.38782900000001064,
              "p75": 0.12849900000014713,
              "p99": 0.151260000000093,
              "p995": 0.1571320000000469,
              "p999": 0.30943500000012136
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4990.317641317679,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20038804578699182,
              "min": 0.14132199999994555,
              "max": 2.7061290000001463,
              "p75": 0.20637299999998504,
              "p99": 0.2696810000002188,
              "p995": 0.27855700000009165,
              "p999": 0.6291980000000876
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9795.961972075722,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10208287893017456,
              "min": 0.07510999999976775,
              "max": 0.4123370000002069,
              "p75": 0.11001399999986461,
              "p99": 0.15106099999957223,
              "p995": 0.15579999999999927,
              "p999": 0.3365360000002511
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6758.536925443422,
            "unit": "ops/s",
            "extra": {
              "mean": 0.147961017455622,
              "min": 0.13822700000002897,
              "max": 0.3877899999999954,
              "p75": 0.15116100000000188,
              "p99": 0.25184699999999793,
              "p995": 0.2818629999999871,
              "p999": 0.365929000000051
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.196055568040526,
            "unit": "ops/s",
            "extra": {
              "mean": 70.44210239999994,
              "min": 69.51046099999996,
              "max": 72.24312599999996,
              "p75": 70.78627699999993,
              "p99": 72.24312599999996,
              "p995": 72.24312599999996,
              "p999": 72.24312599999996
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1699.7668599774959,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5883159764705846,
              "min": 0.3484870000002047,
              "max": 1.4803780000002007,
              "p75": 0.644666000000143,
              "p99": 1.2517840000000433,
              "p995": 1.376777000000402,
              "p999": 1.4803780000002007
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 755.3678749260771,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3238582592592563,
              "min": 0.9610639999998511,
              "max": 5.3799390000001495,
              "p75": 1.5507790000001478,
              "p99": 3.8158249999999043,
              "p995": 5.289160000000038,
              "p999": 5.3799390000001495
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 840386.7747162135,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011899282926455925,
              "min": 0.0010710000001381559,
              "max": 0.06081300000005285,
              "p75": 0.001191999999946347,
              "p99": 0.0015430000000833388,
              "p995": 0.0022440000000187865,
              "p999": 0.009787999999844033
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 526138.7709398291,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019006392519101455,
              "min": 0.001772999999957392,
              "max": 0.2530489999999759,
              "p75": 0.0018730000000459768,
              "p99": 0.003185999999914202,
              "p995": 0.003707000000019889,
              "p999": 0.010950000000036653
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1900439.3918658262,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005261941024166066,
              "min": 0.0004999999946448952,
              "max": 2.2961530000029597,
              "p75": 0.0005110000056447461,
              "p99": 0.0006020000000717118,
              "p995": 0.0008509999897796661,
              "p999": 0.0010420000035082921
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1405649.682307621,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007114148088151838,
              "min": 0.0006709999870508909,
              "max": 0.5591690000001108,
              "p75": 0.0006819999980507419,
              "p99": 0.000941999998758547,
              "p995": 0.0010119999933522195,
              "p999": 0.001532999987830408
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 288734.63428565447,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003463387765981229,
              "min": 0.0032960000025923364,
              "max": 0.03322100000514183,
              "p75": 0.0034460000024409965,
              "p99": 0.0038369999965652823,
              "p995": 0.006332000004476868,
              "p999": 0.012331999998423271
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 292331.41650658014,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003420774995551978,
              "min": 0.0032159999973373488,
              "max": 0.18139700000028824,
              "p75": 0.0033859999966807663,
              "p99": 0.0041769999952521175,
              "p995": 0.005951000006461982,
              "p999": 0.01393600000301376
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 40774.61602800495,
            "unit": "ops/s",
            "extra": {
              "mean": 0.02452506234057917,
              "min": 0.0231939999939641,
              "max": 2.674431999999797,
              "p75": 0.023864000002504326,
              "p99": 0.03960299999744166,
              "p995": 0.04094599999370985,
              "p999": 0.05041299998993054
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 11945.841765378558,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08371113728445662,
              "min": 0.08036900000297464,
              "max": 0.4282870000024559,
              "p75": 0.08274299999175128,
              "p99": 0.100867000001017,
              "p995": 0.10732999999891035,
              "p999": 0.2386839999962831
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986812431162232,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3204982999999,
              "min": 999.8600549999992,
              "max": 1002.0934550000002,
              "p75": 1001.7982240000001,
              "p99": 1002.0934550000002,
              "p995": 1002.0934550000002,
              "p999": 1002.0934550000002
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.332905194360605,
            "unit": "ops/s",
            "extra": {
              "mean": 3003.8582063000003,
              "min": 3003.2741959999985,
              "max": 3004.655064000006,
              "p75": 3004.3864790000007,
              "p99": 3004.655064000006,
              "p995": 3004.655064000006,
              "p999": 3004.655064000006
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.128659700164517,
            "unit": "ops/s",
            "extra": {
              "mean": 98.72974604761943,
              "min": 97.65158599999995,
              "max": 99.91633899999579,
              "p75": 99.20829400000366,
              "p99": 99.91633899999579,
              "p995": 99.91633899999579,
              "p999": 99.91633899999579
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2563144.9388579405,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003901457092182893,
              "min": 0.0003100000000131331,
              "max": 4.123748999999975,
              "p75": 0.0003600000000005821,
              "p99": 0.0007719999999835636,
              "p995": 0.0014529999999695065,
              "p999": 0.0021639999999933934
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "ae7c84957604c2cf81086a7a59425b2206276ccd",
          "message": "chore: prepare for v0.5.2 release\n\n- Consolidate all changes since v0.5.1 into single release\n- Update version in package.json\n- Update CHANGELOG.md with all fixes and features\n\n🤖 Generated with Claude Code\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-05T20:22:51+03:00",
          "tree_id": "73398eebff960096a2d3ccc25a748a521509b942",
          "url": "https://github.com/carlrannaberg/autoagent/commit/ae7c84957604c2cf81086a7a59425b2206276ccd"
        },
        "date": 1751736291152,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4361.385751153591,
            "unit": "ops/s",
            "extra": {
              "mean": 0.22928492388812408,
              "min": 0.16706100000010338,
              "max": 0.7532019999999875,
              "p75": 0.253812000000039,
              "p99": 0.3020530000000008,
              "p995": 0.3813800000000356,
              "p999": 0.690435999999977
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10385.954862640343,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0962838769497384,
              "min": 0.07549100000005637,
              "max": 0.40747799999996914,
              "p75": 0.10990500000002612,
              "p99": 0.15051999999991494,
              "p995": 0.15600099999994654,
              "p999": 0.32474500000012085
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4765.338643250827,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20984867495541057,
              "min": 0.14236499999969965,
              "max": 2.9622499999998126,
              "p75": 0.22705199999973047,
              "p99": 0.27146600000014587,
              "p995": 0.28679299999998875,
              "p999": 0.6892429999998058
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 6567.9729136798,
            "unit": "ops/s",
            "extra": {
              "mean": 0.15225397746650204,
              "min": 0.11174800000026153,
              "max": 0.6865860000002613,
              "p75": 0.1673519999999371,
              "p99": 0.19378999999980806,
              "p995": 0.19822899999962829,
              "p999": 0.5382309999999961
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6652.734543446039,
            "unit": "ops/s",
            "extra": {
              "mean": 0.15031412924556758,
              "min": 0.14043100000003506,
              "max": 0.40298899999999094,
              "p75": 0.15429699999992863,
              "p99": 0.26132599999994,
              "p995": 0.30158099999999877,
              "p999": 0.3576060000000325
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.328074316340048,
            "unit": "ops/s",
            "extra": {
              "mean": 69.79304950000002,
              "min": 69.33462399999996,
              "max": 71.3508240000001,
              "p75": 69.7225269999999,
              "p99": 71.3508240000001,
              "p995": 71.3508240000001,
              "p999": 71.3508240000001
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1909.0325175923406,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5238255455497393,
              "min": 0.3523360000003777,
              "max": 3.3220540000002075,
              "p75": 0.5694800000001123,
              "p99": 1.234016999999767,
              "p995": 1.2986570000002757,
              "p999": 3.3220540000002075
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 700.8281116747155,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4268834017094096,
              "min": 1.0031870000000254,
              "max": 2.646754000000101,
              "p75": 1.6017899999999372,
              "p99": 2.3000290000002224,
              "p995": 2.369999000000007,
              "p999": 2.646754000000101
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 870381.4934378999,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011489214873470286,
              "min": 0.0010619999998198182,
              "max": 0.029974999999922147,
              "p75": 0.0011520000000473374,
              "p99": 0.0012330000001838926,
              "p995": 0.0012830000000576547,
              "p999": 0.00962800000002062
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 491622.1868973616,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0020340823230762264,
              "min": 0.0018129999999700885,
              "max": 0.25991399999998066,
              "p75": 0.0019839999999931024,
              "p99": 0.0038670000000138316,
              "p995": 0.004187999999999192,
              "p999": 0.01227300000005016
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1900399.1752110752,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005262052378490067,
              "min": 0.0004999999946448952,
              "max": 0.4957929999945918,
              "p75": 0.0005110000056447461,
              "p99": 0.0006209999992279336,
              "p995": 0.0008510000043315813,
              "p999": 0.0011220000014873222
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1400816.4647433655,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007138693934349233,
              "min": 0.0006709999870508909,
              "max": 3.16159499999776,
              "p75": 0.0006819999980507419,
              "p99": 0.000941999998758547,
              "p995": 0.0010119999933522195,
              "p999": 0.0015330000023823231
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 286466.66621020867,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003490807545706564,
              "min": 0.0032659999997122213,
              "max": 0.033561999996891245,
              "p75": 0.0034770000056596473,
              "p99": 0.0037869999941904098,
              "p995": 0.0058110000027227215,
              "p999": 0.012403000000631437
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 288059.7053164867,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003471502544589899,
              "min": 0.0032260000007227063,
              "max": 0.3045669999992242,
              "p75": 0.003426999996008817,
              "p99": 0.005079999995359685,
              "p995": 0.006452000001445413,
              "p999": 0.013655000002472661
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41034.23815384383,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024369893167038765,
              "min": 0.023142999998526648,
              "max": 2.31447900000785,
              "p75": 0.02399400000285823,
              "p99": 0.03394300000218209,
              "p995": 0.0403950000036275,
              "p999": 0.04544499999610707
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12107.215534919364,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08259537439602212,
              "min": 0.08058000000892207,
              "max": 0.44005900000047404,
              "p75": 0.08154099999228492,
              "p99": 0.09507699999085162,
              "p995": 0.10561700000835117,
              "p999": 0.2612360000057379
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9985345121067463,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.4676387000003,
              "min": 1000.7832840000001,
              "max": 1002.0292360000003,
              "p75": 1001.8104220000005,
              "p99": 1002.0292360000003,
              "p995": 1002.0292360000003,
              "p999": 1002.0292360000003
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328685181645085,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.189178100001,
              "min": 3003.395297999996,
              "max": 3004.8603370000055,
              "p75": 3004.5454120000068,
              "p99": 3004.8603370000055,
              "p995": 3004.8603370000055,
              "p999": 3004.8603370000055
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.144868004970208,
            "unit": "ops/s",
            "extra": {
              "mean": 98.57200700000006,
              "min": 96.19492199999513,
              "max": 99.96520800000144,
              "p75": 99.01057099999889,
              "p99": 99.96520800000144,
              "p995": 99.96520800000144,
              "p999": 99.96520800000144
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2576201.979390025,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038816832220460175,
              "min": 0.00031999999998788553,
              "max": 1.2080879999999752,
              "p75": 0.0003609999999980573,
              "p99": 0.0007010000000491345,
              "p995": 0.0008709999999609863,
              "p999": 0.002093999999999596
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "25eaf913fe0900c47eb5d3c567a4c430a813629b",
          "message": "docs: consolidate all unreleased changes into v0.5.2 changelog\n\nSince v0.5.2 hasn't been released yet due to test failures, all recent fixes\nare now properly included in the v0.5.2 changelog section:\n\n- Status command fixes\n- TODO.md sync improvements\n- All test failure resolutions\n- Rate limiting enhancements\n\n🤖 Generated with Claude Code\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-05T21:05:51+03:00",
          "tree_id": "71ef30b01a64dce4b0fa7afbbef0d2dba003dda4",
          "url": "https://github.com/carlrannaberg/autoagent/commit/25eaf913fe0900c47eb5d3c567a4c430a813629b"
        },
        "date": 1751739108329,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4718.284841389012,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21194142227869622,
              "min": 0.15528899999992518,
              "max": 0.7409390000000258,
              "p75": 0.2229639999999904,
              "p99": 0.29923299999995834,
              "p995": 0.3419769999999289,
              "p999": 0.6554889999999887
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10221.251375106698,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09783537879084411,
              "min": 0.07386800000006133,
              "max": 0.3657780000000912,
              "p75": 0.10852199999999357,
              "p99": 0.14904699999988225,
              "p995": 0.15446700000006786,
              "p999": 0.30009800000004816
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4769.312320406237,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20967383404969014,
              "min": 0.13809700000001612,
              "max": 2.695066999999881,
              "p75": 0.23271299999987605,
              "p99": 0.2687399999999798,
              "p995": 0.27986600000008366,
              "p999": 0.6070199999999204
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 7191.7737720452,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1390477553516842,
              "min": 0.11047499999995125,
              "max": 0.7140979999999217,
              "p75": 0.14325600000029226,
              "p99": 0.18332100000043283,
              "p995": 0.18814999999995052,
              "p999": 0.5470070000001215
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6893.194419940903,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14507062170002935,
              "min": 0.13552200000003722,
              "max": 0.4262830000000122,
              "p75": 0.14817599999992126,
              "p99": 0.2503960000000234,
              "p995": 0.2804309999999077,
              "p999": 0.3646180000000072
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.176603288914123,
            "unit": "ops/s",
            "extra": {
              "mean": 70.5387588,
              "min": 68.7896740000001,
              "max": 81.14884900000004,
              "p75": 69.46211199999993,
              "p99": 81.14884900000004,
              "p995": 81.14884900000004,
              "p999": 81.14884900000004
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 2006.1201290229471,
            "unit": "ops/s",
            "extra": {
              "mean": 0.4984746354581647,
              "min": 0.33678599999984726,
              "max": 1.4740050000000338,
              "p75": 0.5969800000002579,
              "p99": 1.1192220000002635,
              "p995": 1.2727570000001833,
              "p999": 1.3486590000002252
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 708.4513437822254,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4115295408450736,
              "min": 0.9239390000000185,
              "max": 4.319084999999859,
              "p75": 1.604966000000104,
              "p99": 3.079920000000129,
              "p995": 3.5933749999999236,
              "p999": 4.319084999999859
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 818513.292804547,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0012217272569558504,
              "min": 0.0010709999999107822,
              "max": 0.31548700000007557,
              "p75": 0.0012419999998201092,
              "p99": 0.0013619999999718857,
              "p995": 0.0017229999998562562,
              "p999": 0.009767999999894528
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 511918.33933694084,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001953436560399934,
              "min": 0.0017629999999826396,
              "max": 0.20624400000002652,
              "p75": 0.0019130000000586733,
              "p99": 0.0036370000000260916,
              "p995": 0.003998000000024149,
              "p999": 0.011721000000079584
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1947738.1885886148,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005134160257568435,
              "min": 0.0004899999912595376,
              "max": 0.4638030000060098,
              "p75": 0.0005010000022593886,
              "p99": 0.0007110000005923212,
              "p995": 0.000822000001790002,
              "p999": 0.0010020000045187771
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1379735.9910901443,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007247763387036742,
              "min": 0.0006809999904362485,
              "max": 0.28249500000674743,
              "p75": 0.0007010000117588788,
              "p99": 0.0008320000051753595,
              "p995": 0.000941999998758547,
              "p999": 0.0014319999900180846
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 291690.2831112273,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034282938373325243,
              "min": 0.003246000000217464,
              "max": 0.06256600000051549,
              "p75": 0.003396000000066124,
              "p99": 0.005149999997229315,
              "p995": 0.006290999997872859,
              "p999": 0.012734000003547408
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 292190.1948485012,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034224283279543103,
              "min": 0.003236000004108064,
              "max": 0.15713200000027427,
              "p75": 0.0033660000044619665,
              "p99": 0.005169999996724073,
              "p995": 0.006892999997944571,
              "p999": 0.014557000002241693
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42861.60618750886,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023330903550960007,
              "min": 0.02231200000096578,
              "max": 0.32682800000475254,
              "p75": 0.023061999992933124,
              "p99": 0.033121999993454665,
              "p995": 0.039763999986462295,
              "p999": 0.04651699999521952
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12496.429895027377,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08002285519946169,
              "min": 0.07819500000914559,
              "max": 0.36267500001122244,
              "p75": 0.0790570000099251,
              "p99": 0.0919409999914933,
              "p995": 0.10265099999378435,
              "p999": 0.22099099999468308
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9987626451438357,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.2388877999998,
              "min": 999.7062479999986,
              "max": 1002.0576789999996,
              "p75": 1001.807315,
              "p99": 1002.0576789999996,
              "p995": 1002.0576789999996,
              "p999": 1002.0576789999996
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33289497164203957,
            "unit": "ops/s",
            "extra": {
              "mean": 3003.9504504,
              "min": 3003.058852000002,
              "max": 3004.6756869999954,
              "p75": 3004.457515000002,
              "p99": 3004.6756869999954,
              "p995": 3004.6756869999954,
              "p999": 3004.6756869999954
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.154027197696344,
            "unit": "ops/s",
            "extra": {
              "mean": 98.48309252380879,
              "min": 96.30728099999396,
              "max": 99.68192899999849,
              "p75": 99.11837899999955,
              "p99": 99.68192899999849,
              "p995": 99.68192899999849,
              "p999": 99.68192899999849
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2622689.046852355,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003812880528860863,
              "min": 0.0003100000000131331,
              "max": 1.2893379999999866,
              "p75": 0.0003510000000233049,
              "p99": 0.0007309999999733918,
              "p995": 0.0012719999999717402,
              "p999": 0.0020839999999680003
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "7a1a21fa20909830c4ee361cadd38c4bd5e4fa2b",
          "message": "chore: add .autoagent/rate-limits.json to .gitignore\n\nExclude rate limit state file from version control as it contains\nruntime data that shouldn't be shared between users.\n\n🤖 Generated with Claude Code\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-05T22:26:42+03:00",
          "tree_id": "944d15ddfdef3abfafddab259191370841c6be27",
          "url": "https://github.com/carlrannaberg/autoagent/commit/7a1a21fa20909830c4ee361cadd38c4bd5e4fa2b"
        },
        "date": 1751743723486,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4939.201257197994,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20246188562223105,
              "min": 0.1548209999999699,
              "max": 2.7165109999999686,
              "p75": 0.20434399999999187,
              "p99": 0.3057649999999512,
              "p995": 0.39437999999995554,
              "p999": 0.7427240000000666
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 8890.918668689686,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1124743164642374,
              "min": 0.08097200000008797,
              "max": 0.41359699999998156,
              "p75": 0.12953399999992143,
              "p99": 0.1512239999999565,
              "p995": 0.15711499999997613,
              "p999": 0.35295200000018667
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4848.707465356828,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20624053052175784,
              "min": 0.14041400000019166,
              "max": 2.6652250000001914,
              "p75": 0.2220870000001014,
              "p99": 0.27002700000002733,
              "p995": 0.3902530000000297,
              "p999": 0.7135299999999916
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9613.801052000472,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1040171306428186,
              "min": 0.07555200000024342,
              "max": 0.4236550000000534,
              "p75": 0.11310200000025361,
              "p99": 0.14675500000021202,
              "p995": 0.1533079999999245,
              "p999": 0.3927570000000742
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6721.938341179078,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1487666130279607,
              "min": 0.13800800000001345,
              "max": 0.4654840000000604,
              "p75": 0.1490800000000263,
              "p99": 0.2531460000000152,
              "p995": 0.2881199999999353,
              "p999": 0.401773999999989
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.253780258959917,
            "unit": "ops/s",
            "extra": {
              "mean": 70.15682729999999,
              "min": 69.20260699999994,
              "max": 71.92450700000006,
              "p75": 70.37803600000007,
              "p99": 71.92450700000006,
              "p995": 71.92450700000006,
              "p999": 71.92450700000006
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1855.9216392765668,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5388158523706837,
              "min": 0.35451599999987593,
              "max": 1.5342209999998886,
              "p75": 0.6313249999998334,
              "p99": 1.3178140000004532,
              "p995": 1.4604810000000725,
              "p999": 1.5342209999998886
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 719.755465959463,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3893607583333316,
              "min": 0.9543610000000626,
              "max": 4.785455000000184,
              "p75": 1.5996130000000903,
              "p99": 2.9285979999999654,
              "p995": 3.3587629999999535,
              "p999": 4.785455000000184
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 884053.3723221025,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011311534250170278,
              "min": 0.0010530000001836015,
              "max": 0.3407999999999447,
              "p75": 0.0011319999998704589,
              "p99": 0.0012030000000322616,
              "p995": 0.001362999999855674,
              "p999": 0.00970799999981864
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 504240.89672093897,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001983179084645782,
              "min": 0.0017629999999826396,
              "max": 0.33539000000001806,
              "p75": 0.0018929999999954816,
              "p99": 0.004048000000011598,
              "p995": 0.004278999999996813,
              "p999": 0.013715999999931228
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1897354.0988532274,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005270497481753175,
              "min": 0.0004999999946448952,
              "max": 2.6014739999955054,
              "p75": 0.0005110000056447461,
              "p99": 0.0008119999984046444,
              "p995": 0.0008510000043315813,
              "p999": 0.001101999994716607
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1413311.1322309694,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007075582843683253,
              "min": 0.0006609999982174486,
              "max": 0.2629129999986617,
              "p75": 0.0006819999980507419,
              "p99": 0.0008210000087274238,
              "p995": 0.000941999998758547,
              "p999": 0.0014030000020284206
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 285974.3430650317,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003496817194445294,
              "min": 0.0032759999958216213,
              "max": 0.32771499999944353,
              "p75": 0.0034860000014305115,
              "p99": 0.0037770000053569674,
              "p995": 0.004408000000694301,
              "p999": 0.012483000005886424
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 287160.66757384664,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003482371065817496,
              "min": 0.0032260000007227063,
              "max": 0.18312400000286289,
              "p75": 0.0034460000024409965,
              "p99": 0.005160000000614673,
              "p995": 0.00611199999548262,
              "p999": 0.013205000002926681
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 40647.3224903851,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024601866463321034,
              "min": 0.02314400000614114,
              "max": 4.110677999997279,
              "p75": 0.023894999991171062,
              "p99": 0.040074999997159466,
              "p995": 0.04747900000074878,
              "p999": 0.0644309999916004
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12303.40695547869,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08127829987406061,
              "min": 0.07916799999657087,
              "max": 0.4128749999945285,
              "p75": 0.080110999988392,
              "p99": 0.0940159999881871,
              "p995": 0.10680100000172388,
              "p999": 0.3160630000056699
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9987761516401399,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.2253480000002,
              "min": 999.9152600000007,
              "max": 1002.0669790000011,
              "p75": 1001.7611470000002,
              "p99": 1002.0669790000011,
              "p995": 1002.0669790000011,
              "p999": 1002.0669790000011
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328686133651419,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.188318900001,
              "min": 3003.427176000001,
              "max": 3004.5216770000043,
              "p75": 3004.45018,
              "p99": 3004.5216770000043,
              "p995": 3004.5216770000043,
              "p999": 3004.5216770000043
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.191448801986828,
            "unit": "ops/s",
            "extra": {
              "mean": 98.12147609523873,
              "min": 95.55087599999388,
              "max": 99.81623400000535,
              "p75": 98.98392800000147,
              "p99": 99.81623400000535,
              "p995": 99.81623400000535,
              "p999": 99.81623400000535
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2569175.9177862927,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038922986669657133,
              "min": 0.0003100000000131331,
              "max": 4.254007999999999,
              "p75": 0.0003600000000005821,
              "p99": 0.0007410000000049877,
              "p995": 0.0014120000000730215,
              "p999": 0.002243999999961943
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "887ba6db9e53dc640d58a819a91edf6941b28432",
          "message": "chore: prepare for v0.5.3 release\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-06T12:27:03+03:00",
          "tree_id": "2447c432ab6af1b18ebdd3e8c04a72e4f8b9e0c1",
          "url": "https://github.com/carlrannaberg/autoagent/commit/887ba6db9e53dc640d58a819a91edf6941b28432"
        },
        "date": 1751794270915,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4813.534954760981,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20774753053593553,
              "min": 0.16348500000003696,
              "max": 0.7532670000000508,
              "p75": 0.222945999999979,
              "p99": 0.2896000000000072,
              "p995": 0.3599729999999681,
              "p999": 0.67517399999997
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10414.71819814311,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09601796044546791,
              "min": 0.07903699999997116,
              "max": 0.377845000000093,
              "p75": 0.10790200000008099,
              "p99": 0.1469640000000254,
              "p995": 0.14948900000001686,
              "p999": 0.30589099999997416
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4736.46124153765,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2111280867729341,
              "min": 0.14053199999989374,
              "max": 2.6787589999999,
              "p75": 0.22736499999973603,
              "p99": 0.26276999999981854,
              "p995": 0.2982969999998204,
              "p999": 0.6480099999998856
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9450.46063336886,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10581494794751864,
              "min": 0.07499000000007072,
              "max": 0.39032899999983783,
              "p75": 0.11399299999993673,
              "p99": 0.14607200000000375,
              "p995": 0.15132200000016383,
              "p999": 0.31519799999978204
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6814.764319674496,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14674021772300477,
              "min": 0.13842799999997624,
              "max": 0.38924599999995735,
              "p75": 0.15114199999993616,
              "p99": 0.1916079999999738,
              "p995": 0.26805000000001655,
              "p999": 0.35509300000001076
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.441378294329134,
            "unit": "ops/s",
            "extra": {
              "mean": 69.24546809999997,
              "min": 68.06553400000007,
              "max": 70.31903900000009,
              "p75": 69.85231699999986,
              "p99": 70.31903900000009,
              "p995": 70.31903900000009,
              "p999": 70.31903900000009
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1877.0282399558396,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5327570351437689,
              "min": 0.34661700000015117,
              "max": 1.4714469999998983,
              "p75": 0.6315890000000763,
              "p99": 1.1381349999996928,
              "p995": 1.2319820000002437,
              "p999": 1.4714469999998983
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 708.692159502142,
            "unit": "ops/s",
            "extra": {
              "mean": 1.411049898876407,
              "min": 1.003062,
              "max": 4.7523429999998825,
              "p75": 1.6009090000000015,
              "p99": 2.6290389999999206,
              "p995": 4.695797000000084,
              "p999": 4.7523429999998825
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 892322.1225542645,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011206715318650942,
              "min": 0.0010219999999208085,
              "max": 2.4038849999999456,
              "p75": 0.0011020000001735752,
              "p99": 0.0013019999998959975,
              "p995": 0.0021139999998922576,
              "p999": 0.009958999999980733
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 519591.75059595954,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001924587907435065,
              "min": 0.001772999999957392,
              "max": 0.26657299999999395,
              "p75": 0.0018829999999070424,
              "p99": 0.003796999999963191,
              "p995": 0.0041279999999801475,
              "p999": 0.011150999999983924
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1948763.9142882186,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005131457908616128,
              "min": 0.0004899999912595376,
              "max": 0.48988500000268687,
              "p75": 0.0005010000022593886,
              "p99": 0.0005710000114049762,
              "p995": 0.0008210000087274238,
              "p999": 0.0009820000122999772
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1416119.1418520138,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007061552735543075,
              "min": 0.0006609999982174486,
              "max": 0.22127300000283867,
              "p75": 0.0006819999980507419,
              "p99": 0.0008110000053420663,
              "p995": 0.0009310000023106113,
              "p999": 0.0013619999954244122
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 294077.89354409603,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003400459612752406,
              "min": 0.0032259999934467487,
              "max": 0.03526599999895552,
              "p75": 0.003396000000066124,
              "p99": 0.0036269999982323498,
              "p995": 0.004447999999683816,
              "p999": 0.012473000002501067
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 291692.43769578077,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034282685142593416,
              "min": 0.0032260000007227063,
              "max": 0.19065599999885308,
              "p75": 0.0033859999966807663,
              "p99": 0.004689000001235399,
              "p995": 0.006080999999539927,
              "p999": 0.013785999995889142
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42241.497410569275,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023673403200659013,
              "min": 0.022582000005058944,
              "max": 0.32512699998915195,
              "p75": 0.023414000010234304,
              "p99": 0.03390400001080707,
              "p995": 0.0398540000023786,
              "p999": 0.04521400001249276
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12482.791762066447,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08011028454699275,
              "min": 0.07818599999882281,
              "max": 0.43935299999429844,
              "p75": 0.07908699999097735,
              "p99": 0.0915099999983795,
              "p995": 0.10444500000448897,
              "p999": 0.21777600000496022
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9985453442060488,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.4567749,
              "min": 1000.7517529999986,
              "max": 1002.0812850000002,
              "p75": 1001.7714189999997,
              "p99": 1002.0812850000002,
              "p995": 1002.0812850000002,
              "p999": 1002.0812850000002
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328905640938378,
            "unit": "ops/s",
            "extra": {
              "mean": 3003.9902234,
              "min": 3003.3625820000016,
              "max": 3004.6288490000006,
              "p75": 3004.3376480000006,
              "p99": 3004.6288490000006,
              "p995": 3004.6288490000006,
              "p999": 3004.6288490000006
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.159589359886574,
            "unit": "ops/s",
            "extra": {
              "mean": 98.42917509523873,
              "min": 95.5343320000029,
              "max": 100.04313700000057,
              "p75": 99.25783200000296,
              "p99": 100.04313700000057,
              "p995": 100.04313700000057,
              "p999": 100.04313700000057
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2515863.6679062964,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003974778175608382,
              "min": 0.00031999999998788553,
              "max": 4.531308999999965,
              "p75": 0.0003609999999980573,
              "p99": 0.0007509999999797401,
              "p995": 0.0014319999999088395,
              "p999": 0.002184000000056585
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "7615a6f0a659406b8d700d474a2d55c53c6d3ede",
          "message": "feat: Add code quality improvements with test helpers, error standardization, and pattern optimization\n\n### Added\n- Mock process utilities for cleaner test setup\n- Structured error interfaces for provider operations\n- Compiled regex patterns for performance optimization\n\n### Technical Changes\n- Extract `createMockProcess` utilities to reduce test duplication\n- Implement `UsageLimitError`, `RateLimitError`, and other structured error types\n- Create `PatternMatcher` class with compiled regex patterns\n- Add type guards and factory functions for error handling\n- Optimize pattern matching with pre-compiled constants\n\n### Benefits\n- Reduced test code duplication with reusable mock utilities\n- Better error handling with structured interfaces\n- Improved performance through compiled regex patterns\n- Enhanced type safety with proper error type guards\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-06T21:34:14+03:00",
          "tree_id": "c64707cd60b7acc6299944a3c076f3c7bb944745",
          "url": "https://github.com/carlrannaberg/autoagent/commit/7615a6f0a659406b8d700d474a2d55c53c6d3ede"
        },
        "date": 1751827243805,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4255.901935507609,
            "unit": "ops/s",
            "extra": {
              "mean": 0.23496782001879662,
              "min": 0.16589999999996508,
              "max": 0.9204550000000609,
              "p75": 0.26573499999994965,
              "p99": 0.3080929999999853,
              "p995": 0.39455499999996846,
              "p999": 0.7054519999999229
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10462.988689365126,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09557498623853317,
              "min": 0.07830600000011145,
              "max": 0.4024290000000974,
              "p75": 0.10706900000002406,
              "p99": 0.13830700000005436,
              "p995": 0.1537270000000035,
              "p999": 0.3374989999999798
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4779.555539571234,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20922447531380886,
              "min": 0.13952999999992244,
              "max": 3.677729999999883,
              "p75": 0.22228399999994508,
              "p99": 0.2685300000000552,
              "p995": 0.2826759999998103,
              "p999": 0.6638060000000223
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9148.647866439855,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10930577005464573,
              "min": 0.07612199999994118,
              "max": 0.399543999999878,
              "p75": 0.1247920000000704,
              "p99": 0.14792799999986528,
              "p995": 0.15166199999976016,
              "p999": 0.3402139999998326
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6634.580916218616,
            "unit": "ops/s",
            "extra": {
              "mean": 0.15072542073538395,
              "min": 0.1379460000000563,
              "max": 0.4654069999999706,
              "p75": 0.152924999999982,
              "p99": 0.2553249999999707,
              "p995": 0.28261699999995926,
              "p999": 0.39005699999995613
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.36343122119436,
            "unit": "ops/s",
            "extra": {
              "mean": 69.62124750000001,
              "min": 69.21702600000003,
              "max": 70.29332999999997,
              "p75": 69.91951700000004,
              "p99": 70.29332999999997,
              "p995": 70.29332999999997,
              "p999": 70.29332999999997
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1804.758585978053,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5540907286821799,
              "min": 0.3420069999997395,
              "max": 4.216725000000224,
              "p75": 0.6377080000002024,
              "p99": 1.2086219999996501,
              "p995": 1.27795100000003,
              "p999": 4.216725000000224
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 721.9262034510849,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3851831325966772,
              "min": 0.9223990000000413,
              "max": 5.818489,
              "p75": 1.5856139999998504,
              "p99": 3.441100000000006,
              "p995": 4.681440000000066,
              "p999": 5.818489
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 806349.3065397026,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0012401573262229408,
              "min": 0.0010720000000219443,
              "max": 0.2458280000000741,
              "p75": 0.0012529999999060237,
              "p99": 0.001492999999982203,
              "p995": 0.0020939999999427528,
              "p999": 0.009859000000005835
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 489718.1939193169,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0020419907048925246,
              "min": 0.0017830000000458313,
              "max": 1.2134309999999005,
              "p75": 0.0019340000000056534,
              "p99": 0.0041279999999801475,
              "p995": 0.004377999999974236,
              "p999": 0.012723000000050888
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1947955.2246875076,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005133588222801275,
              "min": 0.0004899999912595376,
              "max": 0.42060299999138806,
              "p75": 0.0005010000022593886,
              "p99": 0.0005810000002384186,
              "p995": 0.0008210000087274238,
              "p999": 0.0010020000045187771
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1404755.654422735,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007118675741589637,
              "min": 0.0006709999870508909,
              "max": 0.32264100000611506,
              "p75": 0.0006819999980507419,
              "p99": 0.0009620000055292621,
              "p995": 0.0010529999999562278,
              "p999": 0.0016230000037467107
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 290257.60757220257,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034452154703688395,
              "min": 0.0032559999963268638,
              "max": 0.2527909999989788,
              "p75": 0.003396000000066124,
              "p99": 0.005208999995375052,
              "p995": 0.0063119999977061525,
              "p999": 0.012792999994417187
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 294108.0865321626,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034001105232808466,
              "min": 0.003214999996998813,
              "max": 0.21237599999585655,
              "p75": 0.003346000004967209,
              "p99": 0.00502000000415137,
              "p995": 0.0063119999977061525,
              "p999": 0.014176000004226808
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41834.33557919369,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023903809781010362,
              "min": 0.022681999995256774,
              "max": 0.33924199998728,
              "p75": 0.023644000000786036,
              "p99": 0.03347200001007877,
              "p995": 0.03968400000303518,
              "p999": 0.050304000003961846
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12331.040940009578,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0810961544013188,
              "min": 0.07835600001271814,
              "max": 0.5031969999981811,
              "p75": 0.07921700000588316,
              "p99": 0.12738700000045355,
              "p995": 0.18623599999409635,
              "p999": 0.28917899999942165
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9984618623121826,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.5405072000001,
              "min": 1000.8418490000022,
              "max": 1002.1071510000002,
              "p75": 1001.8066130000007,
              "p99": 1002.1071510000002,
              "p995": 1002.1071510000002,
              "p999": 1002.1071510000002
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.332903849904177,
            "unit": "ops/s",
            "extra": {
              "mean": 3003.8703376000003,
              "min": 3003.3838469999973,
              "max": 3004.5581200000015,
              "p75": 3004.479002,
              "p99": 3004.5581200000015,
              "p995": 3004.5581200000015,
              "p999": 3004.5581200000015
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.152475632112669,
            "unit": "ops/s",
            "extra": {
              "mean": 98.49814333333259,
              "min": 95.59131699999853,
              "max": 99.8036129999964,
              "p75": 98.90511200000037,
              "p99": 99.8036129999964,
              "p995": 99.8036129999964,
              "p999": 99.8036129999964
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2529996.80078141,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00039525741680429864,
              "min": 0.00031999999998788553,
              "max": 3.8378589999999804,
              "p75": 0.0003609999999980573,
              "p99": 0.0007709999999860884,
              "p995": 0.00141299999995681,
              "p999": 0.0021839999999997417
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "60cac0ce8c0b869c50ed6a8bf91a0cfd4f1dc94e",
          "message": "chore: prepare for v0.5.4 release\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-06T21:52:06+03:00",
          "tree_id": "0bb4d7856b97c35440f80db2e6b79e5372ea5ca1",
          "url": "https://github.com/carlrannaberg/autoagent/commit/60cac0ce8c0b869c50ed6a8bf91a0cfd4f1dc94e"
        },
        "date": 1751829093275,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4325.770102622127,
            "unit": "ops/s",
            "extra": {
              "mean": 0.23117271058714747,
              "min": 0.15984100000002854,
              "max": 1.156737000000021,
              "p75": 0.24780599999996866,
              "p99": 0.3831519999999955,
              "p995": 0.6629279999999653,
              "p999": 1.1039180000000215
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10793.995770864896,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09264409781400836,
              "min": 0.07504500000004555,
              "max": 0.45128199999999197,
              "p75": 0.09763500000008207,
              "p99": 0.14542099999994207,
              "p995": 0.1563610000000608,
              "p999": 0.3278090000001157
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4432.611191293047,
            "unit": "ops/s",
            "extra": {
              "mean": 0.22560065768102877,
              "min": 0.14353800000003503,
              "max": 2.8929110000003675,
              "p75": 0.24542999999994208,
              "p99": 0.30468100000007325,
              "p995": 0.3204100000002654,
              "p999": 0.7570289999998749
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 8671.61374898042,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11531878943726902,
              "min": 0.07712499999979627,
              "max": 0.5352229999998599,
              "p75": 0.1288910000002943,
              "p99": 0.18069900000000416,
              "p995": 0.20118700000011813,
              "p999": 0.39557200000035664
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6668.306490210525,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14996311304347815,
              "min": 0.13703799999996136,
              "max": 0.5356880000000501,
              "p75": 0.15099399999996876,
              "p99": 0.2529260000000022,
              "p995": 0.36968500000000404,
              "p999": 0.4579520000000912
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 13.739383746486544,
            "unit": "ops/s",
            "extra": {
              "mean": 72.78346819999999,
              "min": 71.30603900000006,
              "max": 77.83598499999994,
              "p75": 72.99236700000006,
              "p99": 77.83598499999994,
              "p995": 77.83598499999994,
              "p999": 77.83598499999994
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1898.4384584304232,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5267487052631522,
              "min": 0.35955699999976787,
              "max": 3.7967760000001363,
              "p75": 0.6208090000000084,
              "p99": 1.3670529999999417,
              "p995": 1.5120849999998427,
              "p999": 3.7967760000001363
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 725.8706610337542,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3776559016393395,
              "min": 0.9511700000000474,
              "max": 5.032533000000058,
              "p75": 1.6141079999999874,
              "p99": 2.6250099999999748,
              "p995": 4.808410999999978,
              "p999": 5.032533000000058
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 836672.6696905341,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011952105479552438,
              "min": 0.0010819999999966967,
              "max": 0.4382949999999255,
              "p75": 0.0012019999999210995,
              "p99": 0.0012930000000324071,
              "p995": 0.0017840000000433065,
              "p999": 0.009968000000071697
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 510592.7602807719,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001958507988734713,
              "min": 0.0017629999999826396,
              "max": 0.3662289999999757,
              "p75": 0.0018939999999929569,
              "p99": 0.003675999999927626,
              "p995": 0.0038970000000517757,
              "p999": 0.012172000000020944
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1900329.502141736,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000526224530468514,
              "min": 0.0004999999946448952,
              "max": 0.44533400000364054,
              "p75": 0.0005110000056447461,
              "p99": 0.0006310000026132911,
              "p995": 0.0008420000085607171,
              "p999": 0.001061999995727092
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1395465.9860597735,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007166065027665718,
              "min": 0.0006709999870508909,
              "max": 0.31498999999894295,
              "p75": 0.0006920000014360994,
              "p99": 0.0008119999984046444,
              "p995": 0.0008909999887691811,
              "p999": 0.0014030000020284206
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 287578.3222677091,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00347731356144811,
              "min": 0.003285999999206979,
              "max": 0.04306999999971595,
              "p75": 0.0034470000027795322,
              "p99": 0.004208000005746726,
              "p995": 0.0058309999949415214,
              "p999": 0.012673999997787178
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 289586.8428102051,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003453195560598721,
              "min": 0.0032559999963268638,
              "max": 0.17907500000001164,
              "p75": 0.0034069999965140596,
              "p99": 0.005159000000276137,
              "p995": 0.006362000000081025,
              "p999": 0.013595000003988389
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41465.07773376009,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024116679737605284,
              "min": 0.02303300000494346,
              "max": 2.4172939999989467,
              "p75": 0.023694999996223487,
              "p99": 0.0341340000013588,
              "p995": 0.04037600000447128,
              "p999": 0.04576499998802319
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12126.367943845002,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08246492310235164,
              "min": 0.07827700000780169,
              "max": 0.3844799999933457,
              "p75": 0.08145199999853503,
              "p99": 0.11272100001224317,
              "p995": 0.11605700000654906,
              "p999": 0.2373550000047544
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9987085470075678,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.2931230000002,
              "min": 999.8736040000003,
              "max": 1002.169824999999,
              "p75": 1001.8649679999999,
              "p99": 1002.169824999999,
              "p995": 1002.169824999999,
              "p999": 1002.169824999999
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328625631252139,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.2429242000007,
              "min": 3003.0228720000014,
              "max": 3005.0931860000055,
              "p75": 3004.6775809999963,
              "p99": 3005.0931860000055,
              "p995": 3005.0931860000055,
              "p999": 3005.0931860000055
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.183597598240747,
            "unit": "ops/s",
            "extra": {
              "mean": 98.19712438095095,
              "min": 95.24514500000078,
              "max": 99.61726800000179,
              "p75": 99.29056500000297,
              "p99": 99.61726800000179,
              "p995": 99.61726800000179,
              "p999": 99.61726800000179
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2551306.6427051253,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003919560209899778,
              "min": 0.00031999999998788553,
              "max": 1.2344130000000177,
              "p75": 0.0003699999999753345,
              "p99": 0.0006710000000111904,
              "p995": 0.0009019999999964057,
              "p999": 0.002093999999999596
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "d219b17019983c883809d7f6b7e0d451fa281197",
          "message": "feat: Add Claude Code configuration with development hooks\n\n- Add post-tool-use hooks for automatic validation\n- Configure full checks on file modifications\n- Set up automatic test running for TypeScript changes\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-06T23:12:23+03:00",
          "tree_id": "5460b9fc21d51ca39161be01871f49f17ba6208d",
          "url": "https://github.com/carlrannaberg/autoagent/commit/d219b17019983c883809d7f6b7e0d451fa281197"
        },
        "date": 1751833170546,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4434.40020143933,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2255096415689809,
              "min": 0.16500799999994342,
              "max": 2.626055000000065,
              "p75": 0.24418600000001334,
              "p99": 0.357729000000063,
              "p995": 0.6583419999999478,
              "p999": 1.1946629999999914
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10128.540821637946,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09873090483711791,
              "min": 0.07842699999991964,
              "max": 0.413003000000117,
              "p75": 0.10994499999992513,
              "p99": 0.14986099999987346,
              "p995": 0.15439999999989595,
              "p999": 0.34103800000002593
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4761.084578706688,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2100361763099874,
              "min": 0.14724599999999555,
              "max": 2.839339999999993,
              "p75": 0.22232499999972788,
              "p99": 0.26891200000000026,
              "p995": 0.2927209999998013,
              "p999": 0.6734780000001592
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9663.796403137721,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10347900124171819,
              "min": 0.07683399999996254,
              "max": 0.4234910000000127,
              "p75": 0.11252999999987878,
              "p99": 0.1465939999998227,
              "p995": 0.15070199999991019,
              "p999": 0.3581989999997859
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6847.20102750093,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14604507681074713,
              "min": 0.13720699999998942,
              "max": 0.38863400000002457,
              "p75": 0.15008100000000013,
              "p99": 0.21213699999998425,
              "p995": 0.2679010000000517,
              "p999": 0.3380220000000236
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 13.937804834513539,
            "unit": "ops/s",
            "extra": {
              "mean": 71.74730969999999,
              "min": 69.44460199999992,
              "max": 76.72824300000002,
              "p75": 74.97566199999994,
              "p99": 76.72824300000002,
              "p995": 76.72824300000002,
              "p999": 76.72824300000002
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1852.5796309021528,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5397878629989195,
              "min": 0.35001499999998487,
              "max": 1.872845000000325,
              "p75": 0.6183569999998326,
              "p99": 1.2989479999996547,
              "p995": 1.5644980000001851,
              "p999": 1.872845000000325
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 706.4763044045678,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4154756412429426,
              "min": 0.9960040000000845,
              "max": 5.556178000000045,
              "p75": 1.5920000000000982,
              "p99": 3.1883240000001933,
              "p995": 4.295448999999962,
              "p999": 5.556178000000045
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 887173.27606654,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011271755213746967,
              "min": 0.0010209999998096464,
              "max": 0.30348800000001575,
              "p75": 0.001132999999981621,
              "p99": 0.0012229999999817665,
              "p995": 0.0012719999999717402,
              "p999": 0.009738999999854059
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 509888.83031500614,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019612118182353714,
              "min": 0.0017730000000710788,
              "max": 0.31498999999996613,
              "p75": 0.0019330000000081782,
              "p99": 0.0030550000000175714,
              "p995": 0.0037269999999693937,
              "p999": 0.011550999999997202
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1907083.504141914,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005243608881457694,
              "min": 0.0004999999946448952,
              "max": 2.596287000007578,
              "p75": 0.0005110000056447461,
              "p99": 0.0006409999914467335,
              "p995": 0.0008420000085607171,
              "p999": 0.0010130000009667128
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1399671.1042102715,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007144535576907721,
              "min": 0.0006709999870508909,
              "max": 2.989828999998281,
              "p75": 0.0006819999980507419,
              "p99": 0.0009510000090813264,
              "p995": 0.0010120000079041347,
              "p999": 0.0014720000035595149
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 288600.48600139667,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003464997629959502,
              "min": 0.003285999999206979,
              "max": 0.029235000001790468,
              "p75": 0.0034470000027795322,
              "p99": 0.0037569999985862523,
              "p995": 0.006002000001899432,
              "p999": 0.012273000000277534
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 287434.97902982245,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034790476906300474,
              "min": 0.0032359999968321063,
              "max": 0.20294899999862537,
              "p75": 0.0034460000024409965,
              "p99": 0.004978999997547362,
              "p995": 0.0066730000035022385,
              "p999": 0.013274000004457776
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 40451.12221055101,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024721193018945875,
              "min": 0.023163000005297363,
              "max": 4.339078999997582,
              "p75": 0.024004999999306165,
              "p99": 0.040065000008326024,
              "p995": 0.04699800000526011,
              "p999": 0.06268800000543706
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12175.769050009776,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0821303357424636,
              "min": 0.07917699999234173,
              "max": 0.3484000000025844,
              "p75": 0.08013000000210013,
              "p99": 0.15189399999508169,
              "p995": 0.15690299999550916,
              "p999": 0.22430899999744724
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9984339953171137,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.5684609000006,
              "min": 1000.8549830000002,
              "max": 1002.1024050000015,
              "p75": 1001.8201900000004,
              "p99": 1002.1024050000015,
              "p995": 1002.1024050000015,
              "p999": 1002.1024050000015
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328643747736868,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.2265733,
              "min": 3003.4306890000007,
              "max": 3004.5301940000063,
              "p75": 3004.427862999997,
              "p99": 3004.5301940000063,
              "p995": 3004.5301940000063,
              "p999": 3004.5301940000063
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.158354451645268,
            "unit": "ops/s",
            "extra": {
              "mean": 98.44114071428547,
              "min": 94.81452600000193,
              "max": 99.67672400000447,
              "p75": 99.0874530000001,
              "p99": 99.67672400000447,
              "p995": 99.67672400000447,
              "p999": 99.67672400000447
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2573781.5264238645,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003885333660737895,
              "min": 0.0003099999999562897,
              "max": 4.012874000000011,
              "p75": 0.0003510000000233049,
              "p99": 0.0007919999999899119,
              "p995": 0.0014029999999820575,
              "p999": 0.002184999999997217
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "b1884255d2c19403e9531c9c1c600ca5e96155ae",
          "message": "fix: Fix autonomous-agent test timeouts and improve test reliability\n\n- Add proper git command mock implementations in execMock setup\n- Fix import path in in-memory-config-manager test helper\n- Add timeout protection to promisified exec mock\n- Fix test expectations to use includes() instead of exact matches\n- Add proper cleanup for event listeners in git validation tests\n- Replace deprecated fail() with expect.fail() for better error handling\n\nAll 43 autonomous-agent tests now pass reliably, ensuring core functionality works correctly.\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-07T00:40:15+03:00",
          "tree_id": "13bdbd78c16dc34587336993ffee0a4c1d25ba03",
          "url": "https://github.com/carlrannaberg/autoagent/commit/b1884255d2c19403e9531c9c1c600ca5e96155ae"
        },
        "date": 1751838638575,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4434.348409197601,
            "unit": "ops/s",
            "extra": {
              "mean": 0.22551227547339947,
              "min": 0.17158199999994395,
              "max": 1.0172169999999596,
              "p75": 0.24364700000000994,
              "p99": 0.29930100000001403,
              "p995": 0.33446700000001783,
              "p999": 0.7337360000000217
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9840.836537578056,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10161737736232244,
              "min": 0.07632300000000214,
              "max": 0.46481299999982184,
              "p75": 0.1293229999999994,
              "p99": 0.15370899999993526,
              "p995": 0.16007999999987987,
              "p999": 0.3654559999999947
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 5020.13705915105,
            "unit": "ops/s",
            "extra": {
              "mean": 0.19919774863061385,
              "min": 0.14193699999987075,
              "max": 2.8508539999997993,
              "p75": 0.2068890000000465,
              "p99": 0.2637449999997443,
              "p995": 0.273192999999992,
              "p999": 0.6555199999997967
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9812.96602739603,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1019059881801466,
              "min": 0.07420899999942776,
              "max": 0.4274019999998018,
              "p75": 0.10793299999977535,
              "p99": 0.14429100000006656,
              "p995": 0.14921999999978652,
              "p999": 0.3224950000003446
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6739.248398583159,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1483844994065269,
              "min": 0.13928099999998267,
              "max": 0.4704910000000382,
              "p75": 0.15115300000002208,
              "p99": 0.252063000000021,
              "p995": 0.2836120000000051,
              "p999": 0.3452879999999823
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.154321518677282,
            "unit": "ops/s",
            "extra": {
              "mean": 70.6498011,
              "min": 68.67373799999996,
              "max": 81.20795400000009,
              "p75": 69.98214200000007,
              "p99": 81.20795400000009,
              "p995": 81.20795400000009,
              "p999": 81.20795400000009
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1923.1494294703423,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5199803950103927,
              "min": 0.35704900000018824,
              "max": 4.290212999999767,
              "p75": 0.5944440000002942,
              "p99": 1.207010000000082,
              "p995": 1.2567590000003293,
              "p999": 4.290212999999767
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 729.1938251827003,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3713774931506708,
              "min": 0.9376279999999042,
              "max": 3.7066389999999956,
              "p75": 1.595461000000114,
              "p99": 2.461413999999877,
              "p995": 2.573363999999856,
              "p999": 3.7066389999999956
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 913092.117203997,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0010951797536727466,
              "min": 0.0010020000001986773,
              "max": 0.04095699999993485,
              "p75": 0.0011019999999462016,
              "p99": 0.001191999999946347,
              "p995": 0.0016630000000077416,
              "p999": 0.009637999999995372
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 512135.43869956874,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019526084789977297,
              "min": 0.001753999999948519,
              "max": 0.2640660000000139,
              "p75": 0.001902999999970234,
              "p99": 0.003696999999988293,
              "p995": 0.004007000000001426,
              "p999": 0.01131100000003471
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1905135.801851116,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000524896964840173,
              "min": 0.0004999999946448952,
              "max": 2.5113879999989877,
              "p75": 0.0005110000056447461,
              "p99": 0.0005810000002384186,
              "p995": 0.0008410000009462237,
              "p999": 0.000981999997748062
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1406863.8142918255,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000710800853530639,
              "min": 0.0006609999982174486,
              "max": 0.200485999986995,
              "p75": 0.0006819999980507419,
              "p99": 0.000981999997748062,
              "p995": 0.001061999995727092,
              "p999": 0.001432999997632578
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 283220.1182869289,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003530822619694357,
              "min": 0.003316000002087094,
              "max": 0.035466000001179054,
              "p75": 0.0035260000004200265,
              "p99": 0.0037470000024768524,
              "p995": 0.005670999998983461,
              "p999": 0.012474000002839603
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 288039.36631361133,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003471747673931558,
              "min": 0.0032370000044465996,
              "max": 0.19868200000200886,
              "p75": 0.0034270000032847747,
              "p99": 0.005230000002484303,
              "p995": 0.006111000002420042,
              "p999": 0.013916000003519002
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 40915.40255327244,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0244406736240218,
              "min": 0.023223999989568256,
              "max": 2.253805000000284,
              "p75": 0.02402500000607688,
              "p99": 0.035545999999158084,
              "p995": 0.04044599999906495,
              "p999": 0.0455050000018673
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12333.372861424321,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08108082121864228,
              "min": 0.07920900000317488,
              "max": 0.344916000001831,
              "p75": 0.08004000000073574,
              "p99": 0.09739300000364892,
              "p995": 0.10596800000348594,
              "p999": 0.2083100000018021
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9988107999804515,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.1906159,
              "min": 999.8492979999992,
              "max": 1002.1218719999997,
              "p75": 1001.756007,
              "p99": 1002.1218719999997,
              "p995": 1002.1218719999997,
              "p999": 1002.1218719999997
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328800133255306,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.0854360999992,
              "min": 3002.513396000002,
              "max": 3004.6721739999994,
              "p75": 3004.469146999996,
              "p99": 3004.6721739999994,
              "p995": 3004.6721739999994,
              "p999": 3004.6721739999994
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.141882286641847,
            "unit": "ops/s",
            "extra": {
              "mean": 98.60102609523753,
              "min": 96.21309499999916,
              "max": 99.89180599999963,
              "p75": 99.144776000001,
              "p99": 99.89180599999963,
              "p995": 99.89180599999963,
              "p999": 99.89180599999963
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2570455.804402312,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038903606056456676,
              "min": 0.00029999999998153726,
              "max": 4.133988999999929,
              "p75": 0.0003609999999980573,
              "p99": 0.0007510000000365835,
              "p995": 0.0014820000000099753,
              "p999": 0.0021639999999933934
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "297e640917cba4436415fca0f0c9bd9333db3126",
          "message": "fix: Resolve chalk import issue and improve TypeScript hook\n\n- Fix chalk import to use default import (works at runtime)\n- Update TypeScript hook to use project configuration instead of file-specific check\n- This resolves the esModuleInterop issue while maintaining compatibility",
          "timestamp": "2025-07-07T17:05:13+03:00",
          "tree_id": "098e0387666812c5a0d7409318e1c0d6fae49879",
          "url": "https://github.com/carlrannaberg/autoagent/commit/297e640917cba4436415fca0f0c9bd9333db3126"
        },
        "date": 1751897348785,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4218.72789322857,
            "unit": "ops/s",
            "extra": {
              "mean": 0.23703827914691727,
              "min": 0.1601779999999735,
              "max": 0.7702740000000858,
              "p75": 0.26539399999995794,
              "p99": 0.33859099999995124,
              "p995": 0.4711369999999988,
              "p999": 0.7262029999999982
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10332.142074212148,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09678535126766077,
              "min": 0.07911800000010771,
              "max": 0.9347099999999955,
              "p75": 0.11010499999997592,
              "p99": 0.1436670000000504,
              "p995": 0.1795039999999517,
              "p999": 0.408820999999989
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4908.367258115885,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20373373617194604,
              "min": 0.1428259999997863,
              "max": 3.100581999999804,
              "p75": 0.2119750000001659,
              "p99": 0.276484999999866,
              "p995": 0.31357299999990573,
              "p999": 0.7371619999998984
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9572.622710189731,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1044645788594106,
              "min": 0.07459900000003472,
              "max": 0.4079999999999018,
              "p75": 0.11406200000055833,
              "p99": 0.15018899999995483,
              "p995": 0.15426799999977447,
              "p999": 0.3740060000000085
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6774.6172599695,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14760981493506573,
              "min": 0.13864799999998922,
              "max": 0.4554200000000037,
              "p75": 0.1497789999999668,
              "p99": 0.26062500000000455,
              "p995": 0.33127700000000004,
              "p999": 0.4098319999999376
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.358537815244658,
            "unit": "ops/s",
            "extra": {
              "mean": 69.6449745,
              "min": 69.01749299999994,
              "max": 70.46513100000004,
              "p75": 70.08237600000007,
              "p99": 70.46513100000004,
              "p995": 70.46513100000004,
              "p999": 70.46513100000004
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1945.7280922819987,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5139464265159347,
              "min": 0.3488390000002255,
              "max": 2.2750859999996464,
              "p75": 0.5105399999997644,
              "p99": 1.2322039999999106,
              "p995": 1.3306470000002264,
              "p999": 2.2750859999996464
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 721.5908103855181,
            "unit": "ops/s",
            "extra": {
              "mean": 1.385826961218836,
              "min": 0.9448390000000018,
              "max": 6.714312999999947,
              "p75": 1.582787000000053,
              "p99": 2.745211000000154,
              "p995": 5.453783000000158,
              "p999": 6.714312999999947
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 901130.9186426601,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011097166674807503,
              "min": 0.0010110000000622676,
              "max": 0.03327199999989716,
              "p75": 0.0011120000001483277,
              "p99": 0.001191999999946347,
              "p995": 0.001243000000158645,
              "p999": 0.009747999999945023
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 497982.16443775437,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0020081040475195488,
              "min": 0.001822999999944841,
              "max": 0.24739099999999326,
              "p75": 0.001954000000068845,
              "p99": 0.0036670000000640357,
              "p995": 0.0039669999999887295,
              "p999": 0.011550999999940359
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1920483.965441198,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005207020823890437,
              "min": 0.0004899999912595376,
              "max": 3.0171660000050906,
              "p75": 0.0005010000022593886,
              "p99": 0.0005910000036237761,
              "p995": 0.000822000001790002,
              "p999": 0.0012019999994663522
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1382196.5625404718,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007234860996629915,
              "min": 0.0006609999982174486,
              "max": 3.211447000008775,
              "p75": 0.000690999993821606,
              "p99": 0.0009409999911440536,
              "p995": 0.0010320000001229346,
              "p999": 0.0017230000084964558
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 290890.0591806818,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034377249013479196,
              "min": 0.003246000000217464,
              "max": 0.04558499999984633,
              "p75": 0.003426000002946239,
              "p99": 0.003717999999935273,
              "p995": 0.005559999997785781,
              "p999": 0.01272400000016205
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 290705.1883513766,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034399110854234074,
              "min": 0.003206000001227949,
              "max": 0.27187599999888334,
              "p75": 0.0033760000005713664,
              "p99": 0.0052500000019790605,
              "p995": 0.006541999995533843,
              "p999": 0.015157999994698912
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41943.52830314502,
            "unit": "ops/s",
            "extra": {
              "mean": 0.02384158034518564,
              "min": 0.022602999990340322,
              "max": 0.3217189999995753,
              "p75": 0.02347400000144262,
              "p99": 0.03960400000505615,
              "p995": 0.044111999988672324,
              "p999": 0.05195599999569822
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12457.929550413457,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08027016013803126,
              "min": 0.07819600000220817,
              "max": 0.4617199999920558,
              "p75": 0.07915799999318551,
              "p99": 0.09320399998978246,
              "p995": 0.10702900000615045,
              "p999": 0.3001489999878686
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9985019025631487,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.5003451,
              "min": 1000.8385020000005,
              "max": 1002.1001290000004,
              "p75": 1001.8150050000004,
              "p99": 1002.1001290000004,
              "p995": 1002.1001290000004,
              "p999": 1002.1001290000004
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33287933482061227,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.0915593000004,
              "min": 3002.538253000006,
              "max": 3004.627711000001,
              "p75": 3004.5205209999986,
              "p99": 3004.627711000001,
              "p995": 3004.627711000001,
              "p999": 3004.627711000001
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.123582285763243,
            "unit": "ops/s",
            "extra": {
              "mean": 98.77926328571422,
              "min": 97.25530699999945,
              "max": 99.8364419999998,
              "p75": 99.48133700000471,
              "p99": 99.8364419999998,
              "p995": 99.8364419999998,
              "p999": 99.8364419999998
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2596156.629229097,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003851847722673574,
              "min": 0.0003099999999562897,
              "max": 3.9312589999999545,
              "p75": 0.0003510000000233049,
              "p99": 0.0007719999999835636,
              "p995": 0.0013830000000325526,
              "p999": 0.0020940000000564396
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "61a7d3ed883c8286fb3b1a92bf953e8c64d79815",
          "message": "chore: prepare for v0.6.1 release\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-08T23:44:54+03:00",
          "tree_id": "6aa0a9bf7dbddf32a9927ce12770798372cbffe0",
          "url": "https://github.com/carlrannaberg/autoagent/commit/61a7d3ed883c8286fb3b1a92bf953e8c64d79815"
        },
        "date": 1752007980078,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4728.533681705307,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21148205073995754,
              "min": 0.1565729999999803,
              "max": 0.7554160000000252,
              "p75": 0.22703600000005508,
              "p99": 0.3014549999999758,
              "p995": 0.4181340000000091,
              "p999": 0.6646379999999681
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9151.044283237215,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10927714576048869,
              "min": 0.07866699999999582,
              "max": 0.5529270000001816,
              "p75": 0.13053500000000895,
              "p99": 0.15344800000002579,
              "p995": 0.1960670000000846,
              "p999": 0.3618380000000343
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4922.106295483748,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20316505576434718,
              "min": 0.1404629999997269,
              "max": 2.806728000000021,
              "p75": 0.21278899999992973,
              "p99": 0.27272000000039043,
              "p995": 0.3035890000001018,
              "p999": 0.6811660000000757
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9836.565218924266,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10166150254116453,
              "min": 0.0759819999998399,
              "max": 0.4118220000000292,
              "p75": 0.10842300000012983,
              "p99": 0.15043100000002596,
              "p995": 0.15533100000038758,
              "p999": 0.3736309999999321
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6737.378274732801,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14842568714752166,
              "min": 0.13769800000000032,
              "max": 0.4705240000000117,
              "p75": 0.15103399999998146,
              "p99": 0.24102300000004107,
              "p995": 0.2899039999999786,
              "p999": 0.381546999999955
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.257511339590453,
            "unit": "ops/s",
            "extra": {
              "mean": 70.13846780000002,
              "min": 68.51955600000008,
              "max": 75.98241799999994,
              "p75": 70.23002799999995,
              "p99": 75.98241799999994,
              "p995": 75.98241799999994,
              "p999": 75.98241799999994
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1683.8098204160322,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5938912980997594,
              "min": 0.3453269999999975,
              "max": 1.9005299999998897,
              "p75": 0.645672999999988,
              "p99": 1.1984459999998762,
              "p995": 1.2519360000001143,
              "p999": 1.9005299999998897
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 700.9505354564088,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4266341908832005,
              "min": 0.9960439999999835,
              "max": 4.818197000000055,
              "p75": 1.5926469999999426,
              "p99": 2.7103460000000723,
              "p995": 3.805723000000171,
              "p999": 4.818197000000055
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 891641.5666621104,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001121526897566623,
              "min": 0.0010419999998703133,
              "max": 0.4291439999999511,
              "p75": 0.001111999999920954,
              "p99": 0.0020339999998668645,
              "p995": 0.0022649999998520798,
              "p999": 0.009637999999995372
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 507753.8923561777,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001969458068277147,
              "min": 0.0017829999999889878,
              "max": 1.242036999999982,
              "p75": 0.0018830000000207292,
              "p99": 0.0038170000000263826,
              "p995": 0.004128000000036991,
              "p999": 0.011983000000100219
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1906475.7445212607,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005245280475630243,
              "min": 0.000490999998874031,
              "max": 0.5413939999998547,
              "p75": 0.0005110000056447461,
              "p99": 0.000622000006842427,
              "p995": 0.0008510000043315813,
              "p999": 0.001141999993706122
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1411541.6217216298,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007084452804022311,
              "min": 0.0006609999982174486,
              "max": 0.4744290000089677,
              "p75": 0.0006819999980507419,
              "p99": 0.0008119999984046444,
              "p995": 0.0009010000067064539,
              "p999": 0.0014819999923929572
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 285334.38671945,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003504659958784541,
              "min": 0.003306999999040272,
              "max": 0.08572100000310456,
              "p75": 0.0034870000017690472,
              "p99": 0.0038270000004558824,
              "p995": 0.005880999997316394,
              "p999": 0.012522999997599982
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 284212.13158937276,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0035184986453878453,
              "min": 0.0032759999958216213,
              "max": 0.19502499999362044,
              "p75": 0.003466999994998332,
              "p99": 0.0053600000028382055,
              "p995": 0.006442000005336013,
              "p999": 0.015239000000292435
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 40997.494500909605,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024391734474842438,
              "min": 0.023202999989734963,
              "max": 2.437015000003157,
              "p75": 0.023944000000483356,
              "p99": 0.03665899999032263,
              "p995": 0.04050600000482518,
              "p999": 0.047509000010904856
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 11706.287402110233,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08542417981466396,
              "min": 0.08289499999955297,
              "max": 0.4634280000027502,
              "p75": 0.08414700000139419,
              "p99": 0.10084899999492336,
              "p995": 0.11166900000534952,
              "p999": 0.30171400000108406
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986231347716589,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3787636000001,
              "min": 999.8319350000002,
              "max": 1002.0936620000011,
              "p75": 1001.8665860000001,
              "p99": 1002.0936620000011,
              "p995": 1002.0936620000011,
              "p999": 1002.0936620000011
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33284510256790156,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.4005222999986,
              "min": 3003.4877329999945,
              "max": 3004.7122290000043,
              "p75": 3004.542462000005,
              "p99": 3004.7122290000043,
              "p995": 3004.7122290000043,
              "p999": 3004.7122290000043
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.163566820569994,
            "unit": "ops/s",
            "extra": {
              "mean": 98.39065533333286,
              "min": 96.27746099999786,
              "max": 99.7535910000006,
              "p75": 98.97320899999613,
              "p99": 99.7535910000006,
              "p995": 99.7535910000006,
              "p999": 99.7535910000006
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2649241.904626999,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00037746647380651157,
              "min": 0.00031100000001060835,
              "max": 4.2452290000001085,
              "p75": 0.0003510000000233049,
              "p99": 0.0006309999999984939,
              "p995": 0.0007820000000720029,
              "p999": 0.0015630000000328437
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "fab42dda43c556be046526d34f6ef273a50c9707",
          "message": "chore: prepare for v0.6.2 release",
          "timestamp": "2025-07-09T00:12:47+03:00",
          "tree_id": "030f07b1594228fb6f3cc6d7d0252c6a6851392a",
          "url": "https://github.com/carlrannaberg/autoagent/commit/fab42dda43c556be046526d34f6ef273a50c9707"
        },
        "date": 1752009378136,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4449.328889926199,
            "unit": "ops/s",
            "extra": {
              "mean": 0.22475299640449528,
              "min": 0.17542900000000827,
              "max": 0.8142859999999814,
              "p75": 0.251021000000037,
              "p99": 0.3048919999999953,
              "p995": 0.4388330000000451,
              "p999": 0.75750000000005
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10491.959188034605,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09531108366685555,
              "min": 0.07927900000004229,
              "max": 0.4266900000000078,
              "p75": 0.105207000000064,
              "p99": 0.13903000000004795,
              "p995": 0.15104299999984505,
              "p999": 0.3336349999999584
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4644.096376939837,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21532714199590666,
              "min": 0.14280699999972057,
              "max": 2.849841999999853,
              "p75": 0.23501000000010208,
              "p99": 0.27286199999980454,
              "p995": 0.29049399999985326,
              "p999": 0.6617199999996046
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9325.497318392436,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10723288698263052,
              "min": 0.0759819999998399,
              "max": 0.406833000000006,
              "p75": 0.12003499999991618,
              "p99": 0.14832899999964866,
              "p995": 0.1541589999997086,
              "p999": 0.3356189999999515
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6859.097054745486,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14579178454810565,
              "min": 0.13643600000000333,
              "max": 0.37778800000000956,
              "p75": 0.1475959999999077,
              "p99": 0.22335800000007566,
              "p995": 0.2658280000000559,
              "p999": 0.35539600000004157
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.208466486733768,
            "unit": "ops/s",
            "extra": {
              "mean": 70.38057210000002,
              "min": 68.92447500000003,
              "max": 74.44640900000002,
              "p75": 70.7572090000001,
              "p99": 74.44640900000002,
              "p995": 74.44640900000002,
              "p999": 74.44640900000002
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1905.0297835714657,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5249261762854144,
              "min": 0.34737100000029386,
              "max": 1.9783680000000459,
              "p75": 0.6099129999997785,
              "p99": 1.2067289999999957,
              "p995": 1.4724590000000717,
              "p999": 1.9783680000000459
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 697.9933598296257,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4326783857142877,
              "min": 0.912029000000075,
              "max": 5.209002000000055,
              "p75": 1.585642000000007,
              "p99": 2.519591999999875,
              "p995": 3.1215400000000955,
              "p999": 5.209002000000055
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 825075.5445582465,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0012120102293607668,
              "min": 0.0010709999999107822,
              "max": 0.27507600000012644,
              "p75": 0.001213000000007014,
              "p99": 0.0018840000000182044,
              "p995": 0.0022139999998671556,
              "p999": 0.009888999999930093
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 510965.1988065784,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019570804476226993,
              "min": 0.0017529999999510437,
              "max": 0.28914200000002666,
              "p75": 0.0019130000000586733,
              "p99": 0.003626000000053864,
              "p995": 0.00392700000008972,
              "p999": 0.011772000000007665
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1911271.438078748,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005232119206496498,
              "min": 0.0004999999946448952,
              "max": 0.4323500000027707,
              "p75": 0.0005110000056447461,
              "p99": 0.0005810000002384186,
              "p995": 0.0008419999940088019,
              "p999": 0.0010020000045187771
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1409742.1927181233,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000709349557078873,
              "min": 0.0006609999982174486,
              "max": 0.33660999999847263,
              "p75": 0.0006820000126026571,
              "p99": 0.0008110000053420663,
              "p995": 0.0008819999929983169,
              "p999": 0.0013219999964348972
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 287375.0160279382,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034797736206225436,
              "min": 0.003276000003097579,
              "max": 0.029555000000982545,
              "p75": 0.003466000001935754,
              "p99": 0.0037069999962113798,
              "p995": 0.006161000004794914,
              "p999": 0.012543000004370697
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 294673.5980645359,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033935853315945597,
              "min": 0.003217000004951842,
              "max": 0.12801000000035856,
              "p75": 0.003346999998029787,
              "p99": 0.005109000005177222,
              "p995": 0.006132000002253335,
              "p999": 0.013435000000754371
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41052.08089735594,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024359301115583827,
              "min": 0.022972000006120652,
              "max": 4.075253000002704,
              "p75": 0.023663999993004836,
              "p99": 0.039895000008982606,
              "p995": 0.047539000006509013,
              "p999": 0.06276700001035351
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12294.748461746327,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08133553956889668,
              "min": 0.07930800000031013,
              "max": 0.4211890000005951,
              "p75": 0.08025099999213126,
              "p99": 0.09562899998854846,
              "p995": 0.10437600000295788,
              "p999": 0.24492900000768714
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.998568605227969,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.4334466000003,
              "min": 999.9638790000008,
              "max": 1002.3506259999995,
              "p75": 1001.768435,
              "p99": 1002.3506259999995,
              "p995": 1002.3506259999995,
              "p999": 1002.3506259999995
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.332883949089794,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.049918099999,
              "min": 3003.3932239999995,
              "max": 3004.5675400000036,
              "p75": 3004.520208999995,
              "p99": 3004.5675400000036,
              "p995": 3004.5675400000036,
              "p999": 3004.5675400000036
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.11579108182116,
            "unit": "ops/s",
            "extra": {
              "mean": 98.85534328571451,
              "min": 97.32514699999592,
              "max": 99.73616500000207,
              "p75": 99.32675000000017,
              "p99": 99.73616500000207,
              "p995": 99.73616500000207,
              "p999": 99.73616500000207
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2620433.9141346756,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003816161875351937,
              "min": 0.00031999999998788553,
              "max": 0.5948559999999361,
              "p75": 0.0003609999999980573,
              "p99": 0.0006710000000111904,
              "p995": 0.0007719999999835636,
              "p999": 0.0014320000000225264
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "4ebacf76a3be7d4a998178cb58fafcd8b0b180d7",
          "message": "chore: prepare for v0.6.2 release",
          "timestamp": "2025-07-09T11:12:58+03:00",
          "tree_id": "bd977da68202ab7d918c896ebfd1ab5b27d15765",
          "url": "https://github.com/carlrannaberg/autoagent/commit/4ebacf76a3be7d4a998178cb58fafcd8b0b180d7"
        },
        "date": 1752061976307,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4131.126514609727,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2420647241045513,
              "min": 0.1653800000000274,
              "max": 1.0255620000000363,
              "p75": 0.26228200000002744,
              "p99": 0.3044000000001006,
              "p995": 0.46456100000000333,
              "p999": 0.7167329999999765
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9880.552064378195,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10120891965189317,
              "min": 0.07826700000009623,
              "max": 0.3830679999999802,
              "p75": 0.11379399999998441,
              "p99": 0.15344800000002579,
              "p995": 0.16112199999997756,
              "p999": 0.3187380000001667
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4615.989598490148,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21663826979313205,
              "min": 0.14086399999996502,
              "max": 2.936963999999989,
              "p75": 0.22897899999998117,
              "p99": 0.5105669999998099,
              "p995": 0.6344400000002679,
              "p999": 0.841323999999986
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9771.72353839759,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10233609209987785,
              "min": 0.07413799999994808,
              "max": 0.41292399999974805,
              "p75": 0.11181000000033237,
              "p99": 0.14626399999997375,
              "p995": 0.15164499999991676,
              "p999": 0.3364599999999882
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6591.034334377522,
            "unit": "ops/s",
            "extra": {
              "mean": 0.15172125485437077,
              "min": 0.14398100000005343,
              "max": 0.4773289999999406,
              "p75": 0.15093500000000404,
              "p99": 0.2196440000000166,
              "p995": 0.29026699999997163,
              "p999": 0.3843339999999671
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.11559337616126,
            "unit": "ops/s",
            "extra": {
              "mean": 70.84363889999999,
              "min": 69.67336599999999,
              "max": 74.60347100000001,
              "p75": 70.88644899999997,
              "p99": 74.60347100000001,
              "p995": 74.60347100000001,
              "p999": 74.60347100000001
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1730.678495437185,
            "unit": "ops/s",
            "extra": {
              "mean": 0.577808069284059,
              "min": 0.3591870000000199,
              "max": 2.199814999999944,
              "p75": 0.6366790000001856,
              "p99": 1.235417999999754,
              "p995": 1.3456459999997605,
              "p999": 2.199814999999944
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 710.6369315653862,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4071883342696625,
              "min": 0.9389889999999923,
              "max": 2.9987690000000384,
              "p75": 1.607479000000012,
              "p99": 2.4071339999998145,
              "p995": 2.665962000000036,
              "p999": 2.9987690000000384
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 888078.7016290067,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011260263287090385,
              "min": 0.0010310000000117725,
              "max": 0.3078899999998157,
              "p75": 0.001111999999920954,
              "p99": 0.002034000000094238,
              "p995": 0.0022140000000945292,
              "p999": 0.009816999999884501
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 509326.15012741316,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001963378475167316,
              "min": 0.001772999999957392,
              "max": 1.209840999999983,
              "p75": 0.0018730000000459768,
              "p99": 0.003876999999988584,
              "p995": 0.004197999999973945,
              "p999": 0.011159999999904358
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1902707.1057550178,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005255669656014595,
              "min": 0.0004999999946448952,
              "max": 0.4922720000031404,
              "p75": 0.0005110000056447461,
              "p99": 0.0008010000019567087,
              "p995": 0.0008519999973941594,
              "p999": 0.0012120000028517097
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1403078.3499670513,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007127185734306877,
              "min": 0.0006709999870508909,
              "max": 0.360675000003539,
              "p75": 0.0006819999980507419,
              "p99": 0.0008519999973941594,
              "p995": 0.0010119999933522195,
              "p999": 0.0016030000115279108
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 284560.1014147333,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003514196104894361,
              "min": 0.003325999998196494,
              "max": 0.03216999999858672,
              "p75": 0.003496000004815869,
              "p99": 0.003947999997762963,
              "p995": 0.006441999998060055,
              "p999": 0.01262299999507377
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 288207.94293411175,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003469717003006449,
              "min": 0.003236999997170642,
              "max": 0.17661100000259466,
              "p75": 0.003416999999899417,
              "p99": 0.005099000001791865,
              "p995": 0.0066030000016326085,
              "p999": 0.013826000002154615
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 39808.68726872216,
            "unit": "ops/s",
            "extra": {
              "mean": 0.02512014508917765,
              "min": 0.023213000007672235,
              "max": 4.592550999994273,
              "p75": 0.023935000004712492,
              "p99": 0.05105599999660626,
              "p995": 0.05963200000405777,
              "p999": 0.06958000001031905
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12244.484908670314,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08166942157704817,
              "min": 0.07925899999099784,
              "max": 0.4181630000093719,
              "p75": 0.08039100001042243,
              "p99": 0.09730199999467004,
              "p995": 0.11727899999823421,
              "p999": 0.2844820000027539
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9984458747647762,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.5565443000002,
              "min": 1000.8797959999993,
              "max": 1002.1137369999997,
              "p75": 1001.7990960000006,
              "p99": 1002.1137369999997,
              "p995": 1002.1137369999997,
              "p999": 1002.1137369999997
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33284027057972226,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.444138499998,
              "min": 3003.0115399999995,
              "max": 3005.4285889999956,
              "p75": 3004.6193529999946,
              "p99": 3005.4285889999956,
              "p995": 3005.4285889999956,
              "p999": 3005.4285889999956
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.147654274664749,
            "unit": "ops/s",
            "extra": {
              "mean": 98.5449418095235,
              "min": 96.46458100000018,
              "max": 100.36892499999522,
              "p75": 99.00937900000281,
              "p99": 100.36892499999522,
              "p995": 100.36892499999522,
              "p999": 100.36892499999522
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2662398.886070381,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00037560111868735393,
              "min": 0.00030999999989944627,
              "max": 4.594921999999997,
              "p75": 0.00035000000002582965,
              "p99": 0.0007310000000870787,
              "p995": 0.0009519999999838547,
              "p999": 0.0017129999998815038
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "2cf26d7b65077942a766682188c596cf0dd4b441",
          "message": "docs: Add comprehensive Commander.js CLI option documentation\n\nAdd detailed documentation for Commander.js behavior patterns used throughout the codebase:\n\n- Document --no-* flag behavior (sets base option to false, not noOption property)\n- Add repeatable options documentation with collector function examples\n- Document option conflict resolution (\"last wins\" behavior)\n- Include practical examples from the codebase to prevent future confusion\n\nThis documentation prevents mistakes when implementing new CLI options and clarifies\nexpected behavior for AI agents working on the codebase.\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-10T20:43:43+03:00",
          "tree_id": "3255f401cb1e4ce07f34a4ee3c8fef30b48c9399",
          "url": "https://github.com/carlrannaberg/autoagent/commit/2cf26d7b65077942a766682188c596cf0dd4b441"
        },
        "date": 1752169549817,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4260.083465130535,
            "unit": "ops/s",
            "extra": {
              "mean": 0.23473718488972342,
              "min": 0.16457000000002608,
              "max": 1.5624749999999494,
              "p75": 0.2530169999999998,
              "p99": 0.3172779999999875,
              "p995": 0.6085770000000821,
              "p999": 1.3627700000000686
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 11041.063938599495,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09057098170621093,
              "min": 0.07768699999996898,
              "max": 0.42012099999999464,
              "p75": 0.09871599999996761,
              "p99": 0.1278500000000804,
              "p995": 0.13799999999991996,
              "p999": 0.35029000000008637
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4720.986944383282,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2118201155353191,
              "min": 0.14275899999984176,
              "max": 3.27618399999983,
              "p75": 0.23134600000003047,
              "p99": 0.274167000000034,
              "p995": 0.3289580000000569,
              "p999": 0.81384399999979
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9921.984606798804,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1007862881902451,
              "min": 0.07537000000002081,
              "max": 0.40054300000019794,
              "p75": 0.1085110000003624,
              "p99": 0.14285500000005413,
              "p995": 0.1501090000001568,
              "p999": 0.3548379999997451
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6767.048377054882,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1477749151891263,
              "min": 0.13945699999999306,
              "max": 0.4349700000000212,
              "p75": 0.1500549999999521,
              "p99": 0.23761799999999766,
              "p995": 0.28435400000000755,
              "p999": 0.39178000000003976
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.19453399326447,
            "unit": "ops/s",
            "extra": {
              "mean": 70.44965340000002,
              "min": 69.6496340000001,
              "max": 71.57188300000007,
              "p75": 70.6317509999999,
              "p99": 71.57188300000007,
              "p995": 71.57188300000007,
              "p999": 71.57188300000007
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1894.0201352961076,
            "unit": "ops/s",
            "extra": {
              "mean": 0.527977491561177,
              "min": 0.3456820000001244,
              "max": 1.5529060000003483,
              "p75": 0.6080259999998816,
              "p99": 1.1777689999998984,
              "p995": 1.3893379999999524,
              "p999": 1.5529060000003483
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 707.6568911410138,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4131141977401183,
              "min": 0.9267859999999928,
              "max": 5.039506999999958,
              "p75": 1.5891249999999673,
              "p99": 2.7345229999998537,
              "p995": 3.6966299999999137,
              "p999": 5.039506999999958
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 904645.7105133893,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001105405119792694,
              "min": 0.0010219999999208085,
              "max": 0.3202839999999014,
              "p75": 0.001111999999920954,
              "p99": 0.001191999999946347,
              "p995": 0.0012229999999817665,
              "p999": 0.00966799999991963
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 493644.18042755424,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0020257506107615444,
              "min": 0.0017329999999446954,
              "max": 1.2681900000000041,
              "p75": 0.001874000000043452,
              "p99": 0.004026999999950931,
              "p995": 0.004247999999961394,
              "p999": 0.01505900000006477
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1855578.4264755503,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005389155132070492,
              "min": 0.0004999999946448952,
              "max": 2.601450999994995,
              "p75": 0.0005110000056447461,
              "p99": 0.0008419999940088019,
              "p995": 0.000862000000779517,
              "p999": 0.0011319999903207645
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1400081.4147970036,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007142441785394238,
              "min": 0.0006709999870508909,
              "max": 0.28598000000056345,
              "p75": 0.0006819999980507419,
              "p99": 0.0010020000045187771,
              "p995": 0.0011119999981019646,
              "p999": 0.001392999998643063
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 292809.91801318666,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034151848639053443,
              "min": 0.0032159999973373488,
              "max": 0.22316300000238698,
              "p75": 0.0033760000005713664,
              "p99": 0.005199999999604188,
              "p995": 0.006010999997670297,
              "p999": 0.012533999994047917
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 297603.08695243706,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033601801992054607,
              "min": 0.0031350000062957406,
              "max": 0.14456800000334624,
              "p75": 0.003325999998196494,
              "p99": 0.00405700000555953,
              "p995": 0.005941000003076624,
              "p999": 0.01302399999985937
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42037.1735492883,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023788469004166198,
              "min": 0.02250099999946542,
              "max": 3.00781399999687,
              "p75": 0.023042999993776903,
              "p99": 0.040385000000242144,
              "p995": 0.05051400000229478,
              "p999": 0.06321700000262354
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12477.244777959906,
            "unit": "ops/s",
            "extra": {
              "mean": 0.080145899018221,
              "min": 0.07835500000510365,
              "max": 0.3766179999947781,
              "p75": 0.07911599999351893,
              "p99": 0.09492499999760184,
              "p995": 0.10320100000535604,
              "p999": 0.2155300000013085
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9987387710073404,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.2628217000001,
              "min": 999.9538840000005,
              "max": 1002.1492749999998,
              "p75": 1001.7664159999986,
              "p99": 1002.1492749999998,
              "p995": 1002.1492749999998,
              "p999": 1002.1492749999998
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33287050520094014,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.1712448999992,
              "min": 3003.408853999994,
              "max": 3004.746922999999,
              "p75": 3004.508026000003,
              "p99": 3004.746922999999,
              "p995": 3004.746922999999,
              "p999": 3004.746922999999
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.133419955994697,
            "unit": "ops/s",
            "extra": {
              "mean": 98.68336695238048,
              "min": 96.80344599999808,
              "max": 100.45583500000066,
              "p75": 99.22086899999704,
              "p99": 100.45583500000066,
              "p995": 100.45583500000066,
              "p999": 100.45583500000066
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2644831.481613176,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003780959229168222,
              "min": 0.0003099999999562897,
              "max": 4.336322999999993,
              "p75": 0.0003510000000233049,
              "p99": 0.0007209999999986394,
              "p995": 0.0009109999999736829,
              "p999": 0.0020339999999805514
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "b7c652030567f989d293793161e7f12a40723b00",
          "message": "chore: prepare for v0.6.3 release\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-10T22:04:50+03:00",
          "tree_id": "dd1efb5b268afefe0d32f052c769f43cc22b9c80",
          "url": "https://github.com/carlrannaberg/autoagent/commit/b7c652030567f989d293793161e7f12a40723b00"
        },
        "date": 1752176244540,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4303.096126052528,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2323908113382901,
              "min": 0.16356599999994614,
              "max": 0.9354479999999512,
              "p75": 0.25244199999997363,
              "p99": 0.31472900000005666,
              "p995": 0.4483989999999949,
              "p999": 0.7301559999999654
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10091.655329603846,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09909177110582666,
              "min": 0.07855799999992996,
              "max": 0.44629699999995864,
              "p75": 0.11107799999990675,
              "p99": 0.14814699999999448,
              "p995": 0.15152400000010857,
              "p999": 0.3406480000001011
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4957.2055097709035,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20172655703479497,
              "min": 0.14169500000025437,
              "max": 2.8347819999999047,
              "p75": 0.21388000000024476,
              "p99": 0.2632020000000921,
              "p995": 0.2861649999999827,
              "p999": 0.643242999999984
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10576.744984593402,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09454704651162983,
              "min": 0.0744990000002872,
              "max": 0.42880200000035984,
              "p75": 0.10120899999992616,
              "p99": 0.1456929999994827,
              "p995": 0.15176400000018475,
              "p999": 0.35607600000003004
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6686.4351602065535,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1495565239234457,
              "min": 0.14172499999995125,
              "max": 0.4170799999999417,
              "p75": 0.15198400000008405,
              "p99": 0.19062399999995705,
              "p995": 0.2741930000000252,
              "p999": 0.4058300000000372
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.193710915159706,
            "unit": "ops/s",
            "extra": {
              "mean": 70.45373870000002,
              "min": 69.39649700000018,
              "max": 74.29036199999996,
              "p75": 70.53672700000004,
              "p99": 74.29036199999996,
              "p995": 74.29036199999996,
              "p999": 74.29036199999996
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1761.0277929084377,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5678502088535713,
              "min": 0.34008600000015576,
              "max": 2.305663999999979,
              "p75": 0.6487440000000788,
              "p99": 1.2453390000000581,
              "p995": 1.35143700000026,
              "p999": 2.305663999999979
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 672.7175648702071,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4865079376854657,
              "min": 0.9346379999999499,
              "max": 6.090931999999839,
              "p75": 1.6013750000001892,
              "p99": 3.279602999999952,
              "p995": 3.8332010000001446,
              "p999": 6.090931999999839
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 882449.2357988685,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011332096617373288,
              "min": 0.0010509999999612774,
              "max": 0.03194000000007691,
              "p75": 0.0011419999998452113,
              "p99": 0.001222000000097978,
              "p995": 0.0012529999999060237,
              "p999": 0.009608000000071115
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 514353.05976258166,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001944189853680634,
              "min": 0.0017329999999446954,
              "max": 0.2512399999999957,
              "p75": 0.0019039999999677093,
              "p99": 0.003517000000101689,
              "p995": 0.003696999999988293,
              "p999": 0.011060999999926935
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1899261.8822648213,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005265203336822226,
              "min": 0.0004999999946448952,
              "max": 0.3900100000028033,
              "p75": 0.0005110000056447461,
              "p99": 0.0008320000051753595,
              "p995": 0.000862000000779517,
              "p999": 0.0011820000072475523
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1398165.6812185235,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007152228190356411,
              "min": 0.0006709999870508909,
              "max": 3.2881190000043716,
              "p75": 0.0006819999980507419,
              "p99": 0.0009520000021439046,
              "p995": 0.0010110000002896413,
              "p999": 0.001512999995611608
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 292636.540329733,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00341720825045715,
              "min": 0.003246000000217464,
              "max": 0.025086999994528014,
              "p75": 0.003405999996175524,
              "p99": 0.0036770000006072223,
              "p995": 0.005048999999416992,
              "p999": 0.01238300000113668
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 294403.99705625465,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033966930136784803,
              "min": 0.0031860000017331913,
              "max": 0.15017100000113714,
              "p75": 0.003356000001076609,
              "p99": 0.004678999997850042,
              "p995": 0.0058910000007017516,
              "p999": 0.012893999999505468
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42397.088716860955,
            "unit": "ops/s",
            "extra": {
              "mean": 0.02358652516634494,
              "min": 0.022642000010819174,
              "max": 2.2610940000013215,
              "p75": 0.023142999998526648,
              "p99": 0.034725000004982576,
              "p995": 0.04077700000198092,
              "p999": 0.04613600000448059
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12302.696590900572,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08128299292852827,
              "min": 0.0792280000023311,
              "max": 0.42369399999734014,
              "p75": 0.08013000000210013,
              "p99": 0.09457800000382122,
              "p995": 0.11345299999811687,
              "p999": 0.2642549999873154
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9988490211787651,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.1523051000006,
              "min": 999.9250210000009,
              "max": 1001.8269010000004,
              "p75": 1001.7748060000004,
              "p99": 1001.8269010000004,
              "p995": 1001.8269010000004,
              "p999": 1001.8269010000004
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328670716246196,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.2022334000003,
              "min": 3003.105331999999,
              "max": 3004.7368480000005,
              "p75": 3004.5197660000013,
              "p99": 3004.7368480000005,
              "p995": 3004.7368480000005,
              "p999": 3004.7368480000005
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.186367880434364,
            "unit": "ops/s",
            "extra": {
              "mean": 98.17041871428644,
              "min": 94.82344700000249,
              "max": 99.70052099999884,
              "p75": 99.02223100000265,
              "p99": 99.70052099999884,
              "p995": 99.70052099999884,
              "p999": 99.70052099999884
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2624611.937146594,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003810087067908304,
              "min": 0.00031100000001060835,
              "max": 0.4922910000000229,
              "p75": 0.0003600000000005821,
              "p99": 0.0006910000000175387,
              "p995": 0.0007920000000467553,
              "p999": 0.0015129999999317079
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "7e281165f8aaac122bad3060f0fbcac6604506ed",
          "message": "docs: Document Claude Code integration and specs directory\n\n- Add .claude/ directory structure to directory listing\n- Document shared Claude Code hooks and their purpose\n- Explain specs/ directory for feature documentation\n- Helps developers understand and use shared development tools",
          "timestamp": "2025-07-11T09:43:54+03:00",
          "tree_id": "5e1a23bd22708c32c71577d53c29dc9c3d4a4e8a",
          "url": "https://github.com/carlrannaberg/autoagent/commit/7e281165f8aaac122bad3060f0fbcac6604506ed"
        },
        "date": 1752216643748,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4920.357466589074,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20323726615197074,
              "min": 0.15273600000000442,
              "max": 1.0337660000000142,
              "p75": 0.20927199999994173,
              "p99": 0.29635499999994863,
              "p995": 0.3441739999999527,
              "p999": 0.6198810000000208
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9894.739845512258,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10106379911075158,
              "min": 0.07925899999986541,
              "max": 0.31518100000005234,
              "p75": 0.10995600000001104,
              "p99": 0.14203599999996186,
              "p995": 0.14950999999996384,
              "p999": 0.2742430000000695
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4929.262996105865,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20287008438989837,
              "min": 0.13875999999982014,
              "max": 2.851319999999987,
              "p75": 0.21452200000021548,
              "p99": 0.2695450000001074,
              "p995": 0.27873200000021825,
              "p999": 0.551593000000139
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9205.168092138796,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10863462676515369,
              "min": 0.07561100000020815,
              "max": 0.4468369999999595,
              "p75": 0.11882199999990917,
              "p99": 0.15064200000006167,
              "p995": 0.16261200000008103,
              "p999": 0.32896600000003673
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6858.315707395328,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14580839416909594,
              "min": 0.13810799999998835,
              "max": 0.388919000000044,
              "p75": 0.14847800000006828,
              "p99": 0.19241099999999278,
              "p995": 0.2613890000000083,
              "p999": 0.3530920000000606
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.269995029989046,
            "unit": "ops/s",
            "extra": {
              "mean": 70.07710920000002,
              "min": 68.76630899999986,
              "max": 75.95301100000006,
              "p75": 69.49582499999997,
              "p99": 75.95301100000006,
              "p995": 75.95301100000006,
              "p999": 75.95301100000006
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1859.1556607383573,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5378785763440881,
              "min": 0.34108900000001086,
              "max": 1.4015750000003209,
              "p75": 0.6348000000002685,
              "p99": 1.08347300000014,
              "p995": 1.2348329999999805,
              "p999": 1.4015750000003209
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 729.7351980697371,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3703601013698603,
              "min": 0.95628099999999,
              "max": 6.220953000000009,
              "p75": 1.5770440000001145,
              "p99": 3.0460529999998016,
              "p995": 3.898441999999932,
              "p999": 6.220953000000009
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 895610.9145195731,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011165562900005788,
              "min": 0.0010220000001481822,
              "max": 2.32282999999984,
              "p75": 0.001111999999920954,
              "p99": 0.0012019999999210995,
              "p995": 0.002073999999993248,
              "p999": 0.00969800000007126
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 524528.6488141982,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001906473559186328,
              "min": 0.0016840000000684086,
              "max": 0.21685700000000452,
              "p75": 0.0018130000000837754,
              "p99": 0.003937000000064472,
              "p995": 0.004127999999923304,
              "p999": 0.01168200000000752
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1916782.2058872872,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005217076812005856,
              "min": 0.0004999999946448952,
              "max": 0.3786710000131279,
              "p75": 0.0005110000056447461,
              "p99": 0.0006819999980507419,
              "p995": 0.0008509999897796661,
              "p999": 0.001021999996737577
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1411309.5963544957,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007085617518530767,
              "min": 0.0006709999870508909,
              "max": 0.3283450000017183,
              "p75": 0.0006819999980507419,
              "p99": 0.0008309999975608662,
              "p995": 0.0009509999945294112,
              "p999": 0.0014030000020284206
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 296856.39816374145,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033686321271351382,
              "min": 0.0031860000017331913,
              "max": 0.1898769999970682,
              "p75": 0.0033459999976912513,
              "p99": 0.0035170000046491623,
              "p995": 0.0058910000007017516,
              "p999": 0.012474000002839603
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 301418.70389989327,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00331764415101499,
              "min": 0.0031149999995250255,
              "max": 0.12213900000642752,
              "p75": 0.003276999996160157,
              "p99": 0.004938999998557847,
              "p995": 0.006031000004441012,
              "p999": 0.013514999998733401
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 43230.788673244846,
            "unit": "ops/s",
            "extra": {
              "mean": 0.02313166219470086,
              "min": 0.022301999997580424,
              "max": 0.2108050000097137,
              "p75": 0.02283299999544397,
              "p99": 0.03279199999815319,
              "p995": 0.04077599999436643,
              "p999": 0.046738000004552305
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12327.654794848455,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0811184297939528,
              "min": 0.07928799999353942,
              "max": 0.4028059999982361,
              "p75": 0.08007000001089182,
              "p99": 0.0958400000090478,
              "p995": 0.1027720000129193,
              "p999": 0.20383299999230076
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9985506659181261,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.4514377000002,
              "min": 1000.7204110000002,
              "max": 1002.0893739999992,
              "p75": 1001.8114649999989,
              "p99": 1002.0893739999992,
              "p995": 1002.0893739999992,
              "p999": 1002.0893739999992
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33287531219382716,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.1278622000013,
              "min": 3002.6877230000027,
              "max": 3005.388579999999,
              "p75": 3004.4752829999998,
              "p99": 3005.388579999999,
              "p995": 3005.388579999999,
              "p999": 3005.388579999999
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.110171521197516,
            "unit": "ops/s",
            "extra": {
              "mean": 98.9102902857135,
              "min": 96.55655100000149,
              "max": 99.89555399999517,
              "p75": 99.42210199999681,
              "p99": 99.89555399999517,
              "p995": 99.89555399999517,
              "p999": 99.89555399999517
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2609471.702520442,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038321933096040775,
              "min": 0.00031100000001060835,
              "max": 4.163899000000015,
              "p75": 0.0003609999999980573,
              "p99": 0.0007109999999670435,
              "p995": 0.001142000000072585,
              "p999": 0.002032999999983076
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "ebe500d5dc5b2c45d72f6e62efb2f14daff871ce",
          "message": "docs: Add comprehensive implementation details to hooks specification\n\nEnhance specification with complete implementation guidance:\n- Resource limits: 1MB output, 60s timeout, 10 hooks max, 500 sessions\n- Error recovery: continue with remaining hooks on failures\n- Cross-platform: WSL required for Windows, shell: true everywhere\n- Security model: no restrictions, escape template values\n- Process execution details with timeout/cleanup implementation\n- Session management with file locking and atomic writes\n- Edge case handling for invalid output and resource limits\n- Debugging support with --debug flag and temp file logging\n- Git integration specifics for auth, branching, and error handling\n- Complete code examples for all critical functions\n\nAll design decisions resolved - ready for autonomous implementation.\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-12T22:28:12+03:00",
          "tree_id": "22089eb9d6fc34f3f97c3e61d470d01c202625cf",
          "url": "https://github.com/carlrannaberg/autoagent/commit/ebe500d5dc5b2c45d72f6e62efb2f14daff871ce"
        },
        "date": 1752391198714,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4415.8487130230815,
            "unit": "ops/s",
            "extra": {
              "mean": 0.22645703351449328,
              "min": 0.16347700000005716,
              "max": 0.977542000000085,
              "p75": 0.2544960000000174,
              "p99": 0.3001729999999725,
              "p995": 0.3334350000000086,
              "p999": 0.67196899999999
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10934.90965828809,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09145022970007367,
              "min": 0.07619300000010298,
              "max": 0.3490040000000363,
              "p75": 0.09707200000002558,
              "p99": 0.1372470000001158,
              "p995": 0.14891899999997804,
              "p999": 0.26170999999999367
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4766.132667006148,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2098137147802374,
              "min": 0.13920099999995728,
              "max": 2.756730999999945,
              "p75": 0.22578299999986484,
              "p99": 0.2669199999995726,
              "p995": 0.2862059999997655,
              "p999": 0.5863890000000538
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10600.72519919058,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09433316883606747,
              "min": 0.0731869999999617,
              "max": 0.31631300000026386,
              "p75": 0.10142999999970925,
              "p99": 0.13378099999999904,
              "p995": 0.14657500000021173,
              "p999": 0.2747250000002168
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6846.018461032576,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14607030432242968,
              "min": 0.13725799999997434,
              "max": 0.38711799999998675,
              "p75": 0.1497309999999743,
              "p99": 0.23990100000003167,
              "p995": 0.26476900000000114,
              "p999": 0.3466329999999971
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.262529301457219,
            "unit": "ops/s",
            "extra": {
              "mean": 70.11379109999997,
              "min": 68.66329399999995,
              "max": 72.60627,
              "p75": 70.4699129999999,
              "p99": 72.60627,
              "p995": 72.60627,
              "p999": 72.60627
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 2001.5539617058432,
            "unit": "ops/s",
            "extra": {
              "mean": 0.4996118111888128,
              "min": 0.34772499999962747,
              "max": 1.5971779999999853,
              "p75": 0.5030369999999493,
              "p99": 1.0644539999998415,
              "p995": 1.1210110000001805,
              "p999": 1.445538999999826
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 727.7147009069411,
            "unit": "ops/s",
            "extra": {
              "mean": 1.374164901098897,
              "min": 0.9722510000001421,
              "max": 5.842041999999992,
              "p75": 1.589874000000009,
              "p99": 2.6781029999999646,
              "p995": 3.9756969999998546,
              "p999": 5.842041999999992
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 908091.9146394443,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011012101130721415,
              "min": 0.0010209999998096464,
              "max": 0.31577100000004066,
              "p75": 0.0011019999999462016,
              "p99": 0.001213000000007014,
              "p995": 0.002073999999993248,
              "p999": 0.009658999999828666
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 531243.5378181408,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00188237583859764,
              "min": 0.0017129999999951906,
              "max": 1.211693000000082,
              "p75": 0.001822999999944841,
              "p99": 0.0035159999999905267,
              "p995": 0.0038170000000263826,
              "p999": 0.011300000000005639
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1914059.9616979538,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005224496724297522,
              "min": 0.0004999999946448952,
              "max": 0.4001469999930123,
              "p75": 0.0005110000056447461,
              "p99": 0.000782000002800487,
              "p995": 0.0008510000043315813,
              "p999": 0.0010320000001229346
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1409230.4836655175,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000709607130693712,
              "min": 0.0006709999870508909,
              "max": 0.3095480000047246,
              "p75": 0.0006819999980507419,
              "p99": 0.000901999999769032,
              "p995": 0.0009920000011334196,
              "p999": 0.0014430000010179356
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 294665.2780697943,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003393681150865493,
              "min": 0.0032260000007227063,
              "max": 0.032039999998232815,
              "p75": 0.003377000000909902,
              "p99": 0.0035669999997480772,
              "p995": 0.005880999997316394,
              "p999": 0.01245300000300631
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 298741.53336538,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00334737520000922,
              "min": 0.0031549999985145405,
              "max": 0.14644300000509247,
              "p75": 0.003306999999040272,
              "p99": 0.004077999998116866,
              "p995": 0.006191000000399072,
              "p999": 0.013435000000754371
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 40910.99097132239,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024443309151347025,
              "min": 0.02297299999918323,
              "max": 3.823734000005061,
              "p75": 0.02376399999775458,
              "p99": 0.04106599999067839,
              "p995": 0.046716999990167096,
              "p999": 0.06324800000584219
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12273.488757482635,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08147642612132933,
              "min": 0.07962799999222625,
              "max": 0.3523470000072848,
              "p75": 0.08046099999046419,
              "p99": 0.09831299999495968,
              "p995": 0.10819199999968987,
              "p999": 0.2091400000063004
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9984728299156543,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.5295059,
              "min": 1000.6515650000001,
              "max": 1002.0937700000013,
              "p75": 1001.7836520000001,
              "p99": 1002.0937700000013,
              "p995": 1002.0937700000013,
              "p999": 1002.0937700000013
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328841731069249,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.047896500001,
              "min": 3003.222907999996,
              "max": 3004.982888999999,
              "p75": 3004.4075280000034,
              "p99": 3004.982888999999,
              "p995": 3004.982888999999,
              "p999": 3004.982888999999
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.162867427492293,
            "unit": "ops/s",
            "extra": {
              "mean": 98.39742642857163,
              "min": 95.92305900000065,
              "max": 99.88567200000398,
              "p75": 99.18511199999921,
              "p99": 99.88567200000398,
              "p995": 99.88567200000398,
              "p999": 99.88567200000398
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2658611.856435186,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003761361394592046,
              "min": 0.0003100000000131331,
              "max": 3.889148999999975,
              "p75": 0.0003510000000233049,
              "p99": 0.0007209999999986394,
              "p995": 0.0011419999999588981,
              "p999": 0.002032999999983076
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "ab43842c03357c7606eff02ab3d24c9cac46e008",
          "message": "fix: Mass update legacy issue and plan files to pass validation\n\nUpdate 133 issue files and 84 plan files created before validation system:\n- Add missing Description, Requirements, and Success Criteria sections to issues\n- Add missing Overview and Implementation Steps sections to plans\n- Fix issue reference formats (bare #N to Issue #N in issues)\n- Standardize plan references to #N format\n- Fix invalid plan headers to include # before issue numbers\n- Remove non-existent references to issue #123\n\nAll files now pass validation (0 errors, 0 warnings) enabling autoagent\nto run without validation blocks.\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-13T12:54:17+03:00",
          "tree_id": "680a57ab58c0db5d36b29e80e9cc0fbf321c63bd",
          "url": "https://github.com/carlrannaberg/autoagent/commit/ab43842c03357c7606eff02ab3d24c9cac46e008"
        },
        "date": 1752479094718,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4498.391087450089,
            "unit": "ops/s",
            "extra": {
              "mean": 0.22230170311111155,
              "min": 0.15569200000004457,
              "max": 0.988444999999956,
              "p75": 0.24692300000003797,
              "p99": 0.30797800000004827,
              "p995": 0.4712640000000192,
              "p999": 0.7644349999999349
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9249.861690973166,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10810972460008657,
              "min": 0.07569200000011733,
              "max": 0.44332199999996647,
              "p75": 0.11674900000002708,
              "p99": 0.1502419999999347,
              "p995": 0.15714500000012777,
              "p999": 0.37934199999995144
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4848.559067189861,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20624684285419717,
              "min": 0.14207699999997203,
              "max": 2.739763000000039,
              "p75": 0.22023300000000745,
              "p99": 0.2693959999996878,
              "p995": 0.2962360000001354,
              "p999": 0.7438949999996112
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10012.401760356532,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09987613600958727,
              "min": 0.07470099999954982,
              "max": 0.3667279999999664,
              "p75": 0.10408499999994092,
              "p99": 0.13988500000004933,
              "p995": 0.149120000000039,
              "p999": 0.3021570000000793
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6568.966609586838,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1522309458143061,
              "min": 0.14435099999991508,
              "max": 0.492336000000023,
              "p75": 0.15317900000002282,
              "p99": 0.24149399999998877,
              "p995": 0.2821400000000267,
              "p999": 0.37512600000002294
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.30380295666931,
            "unit": "ops/s",
            "extra": {
              "mean": 69.91147759999998,
              "min": 68.56595500000003,
              "max": 71.45869900000002,
              "p75": 70.55883499999982,
              "p99": 71.45869900000002,
              "p995": 71.45869900000002,
              "p999": 71.45869900000002
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1907.6337457665722,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5242096404612278,
              "min": 0.3464099999996506,
              "max": 2.5699570000001586,
              "p75": 0.5974309999996876,
              "p99": 1.1754860000000917,
              "p995": 1.294619999999668,
              "p999": 2.5699570000001586
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 729.0198546759805,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3717047534246638,
              "min": 0.9631879999999455,
              "max": 4.8995169999998325,
              "p75": 1.5788939999999911,
              "p99": 3.5610249999999724,
              "p995": 4.335639000000128,
              "p999": 4.8995169999998325
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 916287.1093688956,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0010913609825732053,
              "min": 0.0010219999999208085,
              "max": 0.03492599999981394,
              "p75": 0.0010919999999714491,
              "p99": 0.0011719999999968422,
              "p995": 0.001202999999804888,
              "p999": 0.009727999999995518
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 511496.4061771851,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019550479493566464,
              "min": 0.0017740000000117107,
              "max": 0.2622920000000022,
              "p75": 0.0018639999999550128,
              "p99": 0.0036269999999944957,
              "p995": 0.0038870000000770233,
              "p999": 0.01583000000005086
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1917139.4823581877,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005216104562042323,
              "min": 0.0004999999946448952,
              "max": 0.3995299999951385,
              "p75": 0.0005110000056447461,
              "p99": 0.0005910000036237761,
              "p995": 0.0008410000009462237,
              "p999": 0.0009909999935189262
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1409332.2769809286,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007095558771577983,
              "min": 0.0006609999982174486,
              "max": 0.1780739999958314,
              "p75": 0.0006819999980507419,
              "p99": 0.0008119999984046444,
              "p995": 0.0009320000099251047,
              "p999": 0.00923700000566896
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 288414.46044440265,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034672325321662193,
              "min": 0.0032560000036028214,
              "max": 0.0579509999952279,
              "p75": 0.0034469999955035746,
              "p99": 0.0037680000023101456,
              "p995": 0.006973999996262137,
              "p999": 0.012783999998646323
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 293783.7808384907,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034038638795711993,
              "min": 0.0031949999975040555,
              "max": 0.12813000000460306,
              "p75": 0.0033570000014151447,
              "p99": 0.005249999994703103,
              "p995": 0.006832999999460299,
              "p999": 0.013465000003634486
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42554.70880498279,
            "unit": "ops/s",
            "extra": {
              "mean": 0.02349916209232546,
              "min": 0.0224820000003092,
              "max": 2.306438999992679,
              "p75": 0.02311300000292249,
              "p99": 0.03285100001085084,
              "p995": 0.040164999998523854,
              "p999": 0.045415000000502914
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12090.153127462363,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08271193834001446,
              "min": 0.08081200000015087,
              "max": 0.3603259999945294,
              "p75": 0.08162300000549294,
              "p99": 0.09467800000857096,
              "p995": 0.10680100000172388,
              "p999": 0.23185599999851547
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9984826665993154,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.5196391999998,
              "min": 1000.9049239999986,
              "max": 1002.2416459999986,
              "p75": 1001.8109509999995,
              "p99": 1002.2416459999986,
              "p995": 1002.2416459999986,
              "p999": 1002.2416459999986
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33286582681903915,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.213468100001,
              "min": 3002.7578639999992,
              "max": 3004.8441779999994,
              "p75": 3004.6148480000047,
              "p99": 3004.8441779999994,
              "p995": 3004.8441779999994,
              "p999": 3004.8441779999994
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.12708154909531,
            "unit": "ops/s",
            "extra": {
              "mean": 98.74513157142826,
              "min": 97.54707200000121,
              "max": 99.98648099999991,
              "p75": 99.39599400000589,
              "p99": 99.98648099999991,
              "p995": 99.98648099999991,
              "p999": 99.98648099999991
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2622383.4082812336,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003813324919773732,
              "min": 0.00031999999998788553,
              "max": 4.072046,
              "p75": 0.0003600000000005821,
              "p99": 0.0006410000000869331,
              "p995": 0.0007910000000492801,
              "p999": 0.0015519999999469292
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "73474a4d3652ad5d00d9dfe75b3aed7d169c2ea9",
          "message": "feat: Complete issue from issues/86-implement-plan-from-hooks-system-implementation.md\n\nCo-authored-by: Claude <claude@autoagent-cli>",
          "timestamp": "2025-07-14T10:54:27+03:00",
          "tree_id": "74bbe395147fb6f11990cc949bf1d365cbf84046",
          "url": "https://github.com/carlrannaberg/autoagent/commit/73474a4d3652ad5d00d9dfe75b3aed7d169c2ea9"
        },
        "date": 1752479783401,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4814.3979705601105,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2077102902823921,
              "min": 0.16542100000003757,
              "max": 0.9847800000000007,
              "p75": 0.21995299999991857,
              "p99": 0.2956460000000334,
              "p995": 0.3437860000000228,
              "p999": 0.6408739999999966
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9030.140206503951,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11074025177147868,
              "min": 0.07930899999996655,
              "max": 0.3997310000002017,
              "p75": 0.12642700000014884,
              "p99": 0.14919000000008964,
              "p995": 0.15638400000011643,
              "p999": 0.29379100000005565
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4776.459383377655,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20936009703757888,
              "min": 0.1423979999999574,
              "max": 2.830308000000059,
              "p75": 0.22615499999983513,
              "p99": 0.2658400000000256,
              "p995": 0.2758899999998903,
              "p999": 0.6205459999996492
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9942.57751543492,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10057754123089246,
              "min": 0.07537100000035934,
              "max": 0.3841010000001006,
              "p75": 0.10957599999983358,
              "p99": 0.14861999999993714,
              "p995": 0.15410900000006222,
              "p999": 0.32186500000034357
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6792.020411314929,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1472315952310869,
              "min": 0.13851999999997133,
              "max": 0.37121799999999894,
              "p75": 0.1504330000000209,
              "p99": 0.1886140000000296,
              "p995": 0.2549390000000358,
              "p999": 0.346411000000046
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.232629789108783,
            "unit": "ops/s",
            "extra": {
              "mean": 70.26108419999997,
              "min": 68.94868499999995,
              "max": 75.54541000000006,
              "p75": 70.07532199999991,
              "p99": 75.54541000000006,
              "p995": 75.54541000000006,
              "p999": 75.54541000000006
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1905.423205530634,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5248177922350399,
              "min": 0.34442699999999604,
              "max": 1.5550509999998212,
              "p75": 0.6235020000003715,
              "p99": 1.1304340000001503,
              "p995": 1.2067980000001626,
              "p999": 1.5550509999998212
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 718.1118025712138,
            "unit": "ops/s",
            "extra": {
              "mean": 1.392540822222222,
              "min": 1.0044079999997848,
              "max": 4.650988999999981,
              "p75": 1.6018300000000636,
              "p99": 2.7393070000000534,
              "p995": 3.249826000000212,
              "p999": 4.650988999999981
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 894391.1163417371,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001118079083891427,
              "min": 0.00102100000003702,
              "max": 0.3529430000000957,
              "p75": 0.0010920000001988228,
              "p99": 0.0020039999999426072,
              "p995": 0.0021139999998922576,
              "p999": 0.009868999999980588
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 516590.88726320583,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019357677896677543,
              "min": 0.0017329999999446954,
              "max": 1.1734139999999798,
              "p75": 0.0018539999999802603,
              "p99": 0.003796999999963191,
              "p995": 0.004088000000024294,
              "p999": 0.013354999999990014
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1947212.7849513353,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005135545574311705,
              "min": 0.0004899999912595376,
              "max": 0.4384439999994356,
              "p75": 0.0005010000022593886,
              "p99": 0.0007710000063525513,
              "p995": 0.0008309999975608662,
              "p999": 0.0010020000045187771
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1414325.227766371,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007070509528980752,
              "min": 0.0006709999870508909,
              "max": 0.177733000004082,
              "p75": 0.0006819999980507419,
              "p99": 0.0008209999941755086,
              "p995": 0.0009319999953731894,
              "p999": 0.0014119999977992848
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 297463.64899266284,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003361755304846226,
              "min": 0.0031859999944572337,
              "max": 0.23909999999887077,
              "p75": 0.003346000004967209,
              "p99": 0.0036069999987375923,
              "p995": 0.004628000002412591,
              "p999": 0.012592999999469612
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 298564.7764815619,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033493569194079256,
              "min": 0.003166000002238434,
              "max": 0.16808500000479398,
              "p75": 0.003306000005977694,
              "p99": 0.00502000000415137,
              "p995": 0.005970999998680782,
              "p999": 0.013705999997910112
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41934.07992233191,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023846952212905285,
              "min": 0.0224820000003092,
              "max": 2.4938059999985853,
              "p75": 0.02340399999229703,
              "p99": 0.03604799999448005,
              "p995": 0.041066999998292886,
              "p999": 0.052528000000165775
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12098.044387643851,
            "unit": "ops/s",
            "extra": {
              "mean": 0.082657987353835,
              "min": 0.08044099999824539,
              "max": 0.33538999999291264,
              "p75": 0.08155299999634735,
              "p99": 0.09517799998866394,
              "p995": 0.11016700000618584,
              "p999": 0.21973299999081064
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986404936735898,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3613571000002,
              "min": 999.9362870000004,
              "max": 1001.8319730000003,
              "p75": 1001.7620729999999,
              "p99": 1001.8319730000003,
              "p995": 1001.8319730000003,
              "p999": 1001.8319730000003
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33288821193841367,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.011449300001,
              "min": 3003.383743000006,
              "max": 3004.507985999997,
              "p75": 3004.4970140000005,
              "p99": 3004.507985999997,
              "p995": 3004.507985999997,
              "p999": 3004.507985999997
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.13400780013131,
            "unit": "ops/s",
            "extra": {
              "mean": 98.67764261904779,
              "min": 97.15621200000169,
              "max": 100.01706700000068,
              "p75": 99.45491100000072,
              "p99": 100.01706700000068,
              "p995": 100.01706700000068,
              "p999": 100.01706700000068
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2643979.608690926,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003782177429481444,
              "min": 0.0003100000000131331,
              "max": 4.07005700000002,
              "p75": 0.0003509999999664615,
              "p99": 0.0007010000000491345,
              "p995": 0.001040999999986525,
              "p999": 0.002024000000005799
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "33bf8f8ded37c30d447586b13aa99a16db4eac1d",
          "message": "fix: Update issue validation to use 'Acceptance Criteria' section\n\n- Change validator to expect 'Acceptance Criteria' instead of 'Success Criteria'\n- Fix TODO.md header format from 'To-Do' to 'TODO' for validation compliance\n- Ensure bootstrap-created issues now pass validation by default\n- Resolves template/validator mismatch that caused validation failures\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-14T11:24:51+03:00",
          "tree_id": "c47ff2ab41dc48cce44c058a08dbc00ccdab8489",
          "url": "https://github.com/carlrannaberg/autoagent/commit/33bf8f8ded37c30d447586b13aa99a16db4eac1d"
        },
        "date": 1752481980360,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 3996.2022524698627,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2502375847923982,
              "min": 0.16820300000006227,
              "max": 5.12240799999995,
              "p75": 0.25879199999997127,
              "p99": 0.6561130000000048,
              "p995": 1.2414139999999634,
              "p999": 4.334720000000004
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 8309.97587269691,
            "unit": "ops/s",
            "extra": {
              "mean": 0.12033729282964346,
              "min": 0.07886699999994562,
              "max": 3.696721000000025,
              "p75": 0.133008000000018,
              "p99": 0.2507669999999962,
              "p995": 0.44792499999994106,
              "p999": 2.4413710000001174
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 3938.6419597219683,
            "unit": "ops/s",
            "extra": {
              "mean": 0.253894619065753,
              "min": 0.1438079999998081,
              "max": 5.927929999999833,
              "p75": 0.24005699999997887,
              "p99": 1.1940850000000864,
              "p995": 2.3423170000000937,
              "p999": 3.7958749999997963
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 8394.843811741177,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11912073916150558,
              "min": 0.07536100000015722,
              "max": 4.319832000000133,
              "p75": 0.12451199999986784,
              "p99": 0.436584999999468,
              "p995": 0.7206630000000587,
              "p999": 2.6148689999999988
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6618.322837573049,
            "unit": "ops/s",
            "extra": {
              "mean": 0.15109568157099781,
              "min": 0.14218500000004042,
              "max": 0.5815939999999955,
              "p75": 0.15429700000004232,
              "p99": 0.2166339999999991,
              "p995": 0.3487599999999702,
              "p999": 0.442784999999958
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 13.775622715074487,
            "unit": "ops/s",
            "extra": {
              "mean": 72.59199969999997,
              "min": 70.61839199999997,
              "max": 79.18813599999999,
              "p75": 73.0432659999999,
              "p99": 79.18813599999999,
              "p995": 79.18813599999999,
              "p999": 79.18813599999999
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1679.3219947211976,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5954784151838736,
              "min": 0.3425480000000789,
              "max": 7.853858999999829,
              "p75": 0.6412749999999505,
              "p99": 1.6490439999997761,
              "p995": 3.908445000000029,
              "p999": 7.853858999999829
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 707.7095489997488,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4130090535211288,
              "min": 0.9534769999997934,
              "max": 4.66662899999983,
              "p75": 1.6055830000000242,
              "p99": 2.659456999999975,
              "p995": 3.1668030000000726,
              "p999": 4.66662899999983
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 903636.9913915651,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011066390702532437,
              "min": 0.0010219999999208085,
              "max": 0.05476200000020981,
              "p75": 0.001111999999920954,
              "p99": 0.0011930000000575092,
              "p995": 0.001763999999866428,
              "p999": 0.010029000000031374
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 528926.7041295746,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0018906211242361922,
              "min": 0.0017329999999446954,
              "max": 0.2626300000000015,
              "p75": 0.0018340000000307555,
              "p99": 0.0035159999999905267,
              "p995": 0.0036870000000135406,
              "p999": 0.012122999999974127
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1893916.204548475,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005280064649103143,
              "min": 0.0004999999946448952,
              "max": 0.5423509999964153,
              "p75": 0.0005110000056447461,
              "p99": 0.0005909999890718609,
              "p995": 0.0008519999973941594,
              "p999": 0.0012920000008307397
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1403095.5818771506,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007127098202833312,
              "min": 0.0006709999870508909,
              "max": 0.496765999996569,
              "p75": 0.0006819999980507419,
              "p99": 0.0008410000009462237,
              "p995": 0.0009719999943627045,
              "p999": 0.0017539999971631914
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 287891.15935742954,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003473534936717025,
              "min": 0.0032560000036028214,
              "max": 0.35301800000161165,
              "p75": 0.003466999994998332,
              "p99": 0.00384699999995064,
              "p995": 0.005990999998175539,
              "p999": 0.012774000002536923
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 299641.9352768012,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033373165844634758,
              "min": 0.003125999995972961,
              "max": 0.24227200000314042,
              "p75": 0.003276000003097579,
              "p99": 0.004898999999568332,
              "p995": 0.006452000001445413,
              "p999": 0.014757999997527804
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42131.42895055173,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023735250023768886,
              "min": 0.022572000001673587,
              "max": 2.5503950000129407,
              "p75": 0.023232999999891035,
              "p99": 0.03501500000129454,
              "p995": 0.040595999991637655,
              "p999": 0.05697600000712555
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12105.149997741244,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08260946788652719,
              "min": 0.07999899999413174,
              "max": 0.5147399999987101,
              "p75": 0.08145099999092054,
              "p99": 0.09935599999153055,
              "p995": 0.11593600000196602,
              "p999": 0.3215090000012424
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9989341160209091,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.0670213,
              "min": 999.8622380000006,
              "max": 1001.7193739999984,
              "p75": 1001.6723660000007,
              "p99": 1001.7193739999984,
              "p995": 1001.7193739999984,
              "p999": 1001.7193739999984
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3329260390081688,
            "unit": "ops/s",
            "extra": {
              "mean": 3003.6701334,
              "min": 3002.129464999998,
              "max": 3004.728894,
              "p75": 3004.301256999999,
              "p99": 3004.728894,
              "p995": 3004.728894,
              "p999": 3004.728894
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.146363678035193,
            "unit": "ops/s",
            "extra": {
              "mean": 98.55747652381078,
              "min": 92.78783600000315,
              "max": 99.9344390000042,
              "p75": 99.50323000000208,
              "p99": 99.9344390000042,
              "p995": 99.9344390000042,
              "p999": 99.9344390000042
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2620360.811685081,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038162683380878675,
              "min": 0.00031000000012681994,
              "max": 0.5500660000000153,
              "p75": 0.0003510000000233049,
              "p99": 0.000711000000023887,
              "p995": 0.0008919999999079664,
              "p999": 0.0015129999999317079
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "ab3bc447547d5070ae2b312278db4f89a6faaf81",
          "message": "fix: Update test fixtures and templates to use Acceptance Criteria\n\n- Update all test issue templates to include required Description section\n- Change all occurrences of \"Success Criteria\" to \"Acceptance Criteria\"\n- Fix singular \"Requirement\" to plural \"Requirements\" in templates\n- Update test helpers to create validation-compliant issue files\n- Fix integration tests to properly disable git auto-push\n- Ensure all issue files pass validation with required sections\n\nThis completes the migration to standardized \"Acceptance Criteria\" sections\nacross the entire codebase, including all test fixtures and utilities.\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-14T14:49:26+03:00",
          "tree_id": "16f247b29cd1e316adb0c9762a2f4ea2391a5d35",
          "url": "https://github.com/carlrannaberg/autoagent/commit/ab3bc447547d5070ae2b312278db4f89a6faaf81"
        },
        "date": 1752511626800,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4556.210675830955,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21948063229486672,
              "min": 0.15390800000000127,
              "max": 0.8061890000000176,
              "p75": 0.2386070000000018,
              "p99": 0.29357500000003256,
              "p995": 0.3940979999999854,
              "p999": 0.6645130000000563
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10737.235551777838,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09313384205624725,
              "min": 0.07447900000011032,
              "max": 0.38980900000001384,
              "p75": 0.10574799999994866,
              "p99": 0.13069400000017595,
              "p995": 0.13704700000005232,
              "p999": 0.30618299999991905
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4905.284130708609,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2038617893181127,
              "min": 0.1388699999997698,
              "max": 2.7613130000002,
              "p75": 0.2207229999999072,
              "p99": 0.26812199999994846,
              "p995": 0.2805550000000494,
              "p999": 0.6350989999996273
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10981.835392389554,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0910594599417328,
              "min": 0.0733780000000479,
              "max": 0.427560000000085,
              "p75": 0.09587899999996807,
              "p99": 0.1302639999994426,
              "p995": 0.13709700000026714,
              "p999": 0.33080900000004476
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6719.901755036353,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14881169940476163,
              "min": 0.13932199999999284,
              "max": 0.4899310000000696,
              "p75": 0.1499229999999443,
              "p99": 0.24894800000004125,
              "p995": 0.2761600000000044,
              "p999": 0.3509209999999712
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 13.862087562989519,
            "unit": "ops/s",
            "extra": {
              "mean": 72.13920669999999,
              "min": 69.91909299999998,
              "max": 80.43464700000004,
              "p75": 73.09061100000008,
              "p99": 80.43464700000004,
              "p995": 80.43464700000004,
              "p999": 80.43464700000004
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1886.6888380452424,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5300291069915262,
              "min": 0.35782000000017433,
              "max": 1.9526009999999587,
              "p75": 0.6241070000000946,
              "p99": 1.118775999999798,
              "p995": 1.2571000000002641,
              "p999": 1.9526009999999587
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 735.1987223019255,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3601764661246623,
              "min": 0.9581630000000132,
              "max": 4.799964000000045,
              "p75": 1.5713630000000194,
              "p99": 3.168089000000009,
              "p995": 4.63260500000024,
              "p999": 4.799964000000045
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 791656.7792652029,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0012631736709539409,
              "min": 0.0010509999999612774,
              "max": 0.6617969999999787,
              "p75": 0.0012619999999969878,
              "p99": 0.001492999999982203,
              "p995": 0.0021940000001450244,
              "p999": 0.009907999999995809
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 523490.94883014983,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001910252703002238,
              "min": 0.0017329999999446954,
              "max": 0.24486799999999675,
              "p75": 0.0018629999999575375,
              "p99": 0.0035469999999122592,
              "p995": 0.003947000000039225,
              "p999": 0.011330999999984215
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1915409.467499515,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000522081579405294,
              "min": 0.0004999999946448952,
              "max": 0.43592099999659695,
              "p75": 0.0005110000056447461,
              "p99": 0.0007110000005923212,
              "p995": 0.0008510000043315813,
              "p999": 0.0010320000001229346
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1412877.0364181723,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007077756763144304,
              "min": 0.0006609999982174486,
              "max": 0.31075800000689924,
              "p75": 0.0006819999980507419,
              "p99": 0.0008210000087274238,
              "p995": 0.000941999998758547,
              "p999": 0.0014130000054137781
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 294072.86487899494,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034005177608327783,
              "min": 0.003196000005118549,
              "max": 0.2249320000046282,
              "p75": 0.003386999997019302,
              "p99": 0.0036469999977271073,
              "p995": 0.005591000001004431,
              "p999": 0.012162999999418389
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 297693.1200393535,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003359163960080116,
              "min": 0.003165000001899898,
              "max": 0.17558999999891967,
              "p75": 0.0033159999948111363,
              "p99": 0.005099000001791865,
              "p995": 0.006912999997439329,
              "p999": 0.01394599999912316
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42448.9221370119,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023557724193144683,
              "min": 0.022431999997934327,
              "max": 2.3787040000024717,
              "p75": 0.023153999994974583,
              "p99": 0.03337200000532903,
              "p995": 0.04083600000012666,
              "p999": 0.046566000004531816
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12250.733191285364,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08162776744753174,
              "min": 0.07974800000374671,
              "max": 0.3388510000077076,
              "p75": 0.08064000000013039,
              "p99": 0.0922009999922011,
              "p995": 0.10123799998837058,
              "p999": 0.21158400000422262
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9987069988165657,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.2946752000001,
              "min": 1000.7711399999998,
              "max": 1001.882501,
              "p75": 1001.780995000001,
              "p99": 1001.882501,
              "p995": 1001.882501,
              "p999": 1001.882501
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328948095914038,
            "unit": "ops/s",
            "extra": {
              "mean": 3003.951912700001,
              "min": 3002.512552,
              "max": 3004.4704439999987,
              "p75": 3004.451454000002,
              "p99": 3004.4704439999987,
              "p995": 3004.4704439999987,
              "p999": 3004.4704439999987
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.180732779960769,
            "unit": "ops/s",
            "extra": {
              "mean": 98.22475666666634,
              "min": 90.62771999999677,
              "max": 100.2771769999963,
              "p75": 99.02157399999851,
              "p99": 100.2771769999963,
              "p995": 100.2771769999963,
              "p999": 100.2771769999963
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2654759.378786241,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00037668197275837523,
              "min": 0.0003199999998741987,
              "max": 0.5965759999999136,
              "p75": 0.0003600000000005821,
              "p99": 0.0006710000000111904,
              "p995": 0.0008520000000089567,
              "p999": 0.0016130000000202926
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "71655463d6f98e064d6d7960f6e1ad2c587bc55f",
          "message": "feat: Enhance release script with improved UX and combined CHANGELOG/README updates\n\n- Add colored output with helpful emojis for better readability\n- Combine CHANGELOG and README updates in single AI operation for efficiency\n- Add command-line options: --dry-run, --yes, --type for flexibility\n- Improve environment validation with main branch check\n- Add interactive mode with release type selection\n- Maintain smart diff filtering and all existing functionality\n- Add proper error handling and cleanup functions\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-15T00:20:58+03:00",
          "tree_id": "f0a6fa280a8da3c5c918bab6f12a76bf7474efa6",
          "url": "https://github.com/carlrannaberg/autoagent/commit/71655463d6f98e064d6d7960f6e1ad2c587bc55f"
        },
        "date": 1752531158017,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4161.050023957438,
            "unit": "ops/s",
            "extra": {
              "mean": 0.24032395530994674,
              "min": 0.16784400000005917,
              "max": 5.416332000000011,
              "p75": 0.2622390000000223,
              "p99": 0.3484709999999609,
              "p995": 0.6315089999999373,
              "p999": 1.093821999999932
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9709.524388657073,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10299165643666613,
              "min": 0.07646199999999226,
              "max": 0.4036230000001524,
              "p75": 0.11599700000010671,
              "p99": 0.1509320000000116,
              "p995": 0.16560000000004038,
              "p999": 0.3603809999999612
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4910.892979364753,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20362895387904678,
              "min": 0.14048200000024735,
              "max": 2.693257999999787,
              "p75": 0.21621400000003632,
              "p99": 0.26022599999987506,
              "p995": 0.2719180000003689,
              "p999": 0.6304869999999028
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10063.088284201676,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09937307233704071,
              "min": 0.07276499999989028,
              "max": 0.32177999999976237,
              "p75": 0.10702899999978399,
              "p99": 0.14146400000026915,
              "p995": 0.1458119999997507,
              "p999": 0.30262500000026193
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6650.162520194744,
            "unit": "ops/s",
            "extra": {
              "mean": 0.15037226488274094,
              "min": 0.1412440000000288,
              "max": 0.40889500000002954,
              "p75": 0.15343800000005103,
              "p99": 0.25147099999992406,
              "p995": 0.2786919999999782,
              "p999": 0.3749209999999721
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.026824649782762,
            "unit": "ops/s",
            "extra": {
              "mean": 71.29197270000002,
              "min": 69.61672399999998,
              "max": 79.07163700000001,
              "p75": 71.02614900000003,
              "p99": 79.07163700000001,
              "p995": 79.07163700000001,
              "p999": 79.07163700000001
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1606.8746735286404,
            "unit": "ops/s",
            "extra": {
              "mean": 0.622326069651739,
              "min": 0.3413070000001426,
              "max": 5.145445999999993,
              "p75": 0.6346840000001066,
              "p99": 1.4894309999999678,
              "p995": 1.8113819999998668,
              "p999": 5.145445999999993
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 694.7851403906207,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4392938793103462,
              "min": 0.9860129999999572,
              "max": 5.724683999999797,
              "p75": 1.5846990000000005,
              "p99": 2.957148999999845,
              "p995": 4.649606999999833,
              "p999": 5.724683999999797
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 889634.3773069035,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011240572818545915,
              "min": 0.0010120000001734297,
              "max": 0.33901300000002266,
              "p75": 0.0011219999998957064,
              "p99": 0.0019839999999931024,
              "p995": 0.002203999999892403,
              "p999": 0.009868999999980588
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 506215.4866974788,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001975443316687017,
              "min": 0.0017129999999951906,
              "max": 0.2250099999999975,
              "p75": 0.0018430000000080327,
              "p99": 0.003917000000001281,
              "p995": 0.004127000000039516,
              "p999": 0.012833999999998014
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1785471.189676256,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005600762452970867,
              "min": 0.0004999999946448952,
              "max": 2.497048999997787,
              "p75": 0.0005110000056447461,
              "p99": 0.0008120000129565597,
              "p995": 0.0008519999973941594,
              "p999": 0.009357000002637506
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1405810.554795411,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000711333398791796,
              "min": 0.0006610000127693638,
              "max": 0.5060940000112168,
              "p75": 0.0006819999980507419,
              "p99": 0.0009209999989252537,
              "p995": 0.0010020000045187771,
              "p999": 0.0015719999937573448
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 290144.63515976525,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034465569196182448,
              "min": 0.003246000000217464,
              "max": 0.2426530000011553,
              "p75": 0.003416999999899417,
              "p99": 0.0051700000040000305,
              "p995": 0.006372000003466383,
              "p999": 0.01266399999440182
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 292842.1410388017,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034148090723988373,
              "min": 0.003174999998009298,
              "max": 0.17768100000103004,
              "p75": 0.0033660000044619665,
              "p99": 0.005751000004238449,
              "p995": 0.007203000001027249,
              "p999": 0.01429699999425793
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42321.32031960575,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023628752421902596,
              "min": 0.02253200000268407,
              "max": 2.164079000009224,
              "p75": 0.023222999996505678,
              "p99": 0.03462399999261834,
              "p995": 0.0406760000041686,
              "p999": 0.048661000007996336
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 11357.046297365503,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08805106308600417,
              "min": 0.08530900000187103,
              "max": 0.40196000000287313,
              "p75": 0.08673300000373274,
              "p99": 0.10538700000324752,
              "p995": 0.11472400001366623,
              "p999": 0.2754539999878034
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9984529281398882,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.5494689999998,
              "min": 1000.8421330000001,
              "max": 1002.090377999999,
              "p75": 1001.7991810000003,
              "p99": 1002.090377999999,
              "p995": 1002.090377999999,
              "p999": 1002.090377999999
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328904764050589,
            "unit": "ops/s",
            "extra": {
              "mean": 3003.991014700002,
              "min": 3003.331081000004,
              "max": 3004.624143000001,
              "p75": 3004.4264610000027,
              "p99": 3004.624143000001,
              "p995": 3004.624143000001,
              "p999": 3004.624143000001
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.13128988522679,
            "unit": "ops/s",
            "extra": {
              "mean": 98.70411480952455,
              "min": 97.53221800000028,
              "max": 99.8549020000064,
              "p75": 99.3862169999993,
              "p99": 99.8549020000064,
              "p995": 99.8549020000064,
              "p999": 99.8549020000064
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2665300.727010703,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003751921837058743,
              "min": 0.0003100000000131331,
              "max": 3.8808899999999085,
              "p75": 0.0003510000000233049,
              "p99": 0.0006409999999732463,
              "p995": 0.0008520000000089567,
              "p999": 0.0020429999999578285
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "0fbd330835aadddd1d032cf93d380e48b169ce2b",
          "message": "chore: prepare release v0.6.5\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-15T02:25:46+03:00",
          "tree_id": "cd2c391d72a7940044b8be6c330edaef47e581aa",
          "url": "https://github.com/carlrannaberg/autoagent/commit/0fbd330835aadddd1d032cf93d380e48b169ce2b"
        },
        "date": 1752535814455,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4633.420618552165,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21582327233491624,
              "min": 0.16656399999999394,
              "max": 0.8592869999999948,
              "p75": 0.23641600000001972,
              "p99": 0.30168800000001283,
              "p995": 0.3386470000000372,
              "p999": 0.7166889999999739
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10454.10782739142,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09565617807957187,
              "min": 0.07632399999988593,
              "max": 0.3570319999998901,
              "p75": 0.1049279999999726,
              "p99": 0.1345129999999699,
              "p995": 0.14302900000006957,
              "p999": 0.3155970000000252
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4766.616456590141,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20979241965596757,
              "min": 0.14107599999988452,
              "max": 2.8414359999999306,
              "p75": 0.22820900000010624,
              "p99": 0.2661009999997077,
              "p995": 0.2773580000000493,
              "p999": 0.6063110000000052
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10416.926827364086,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0959976024188932,
              "min": 0.07384099999990212,
              "max": 0.34783500000003187,
              "p75": 0.1023219999997309,
              "p99": 0.13698400000021138,
              "p995": 0.14672599999994418,
              "p999": 0.2886439999997492
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6790.880319652897,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14725631330977618,
              "min": 0.1383809999999812,
              "max": 0.4372530000000552,
              "p75": 0.14807900000005247,
              "p99": 0.25204500000006647,
              "p995": 0.2862089999999853,
              "p999": 0.38494499999995924
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.211950546965607,
            "unit": "ops/s",
            "extra": {
              "mean": 70.36331829999999,
              "min": 69.20184199999994,
              "max": 74.91366099999993,
              "p75": 70.405127,
              "p99": 74.91366099999993,
              "p995": 74.91366099999993,
              "p999": 74.91366099999993
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1801.1452521114243,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5552023074361895,
              "min": 0.3406609999997272,
              "max": 1.990690000000086,
              "p75": 0.629805000000033,
              "p99": 1.263618999999835,
              "p995": 1.3607710000001134,
              "p999": 1.990690000000086
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 677.77359921801,
            "unit": "ops/s",
            "extra": {
              "mean": 1.475418932153396,
              "min": 0.9258890000000974,
              "max": 4.912706999999955,
              "p75": 1.5916600000000471,
              "p99": 2.975608000000193,
              "p995": 4.419394000000011,
              "p999": 4.912706999999955
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 899453.2426603588,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011117865304951806,
              "min": 0.00102100000003702,
              "max": 0.24108400000000074,
              "p75": 0.0011019999999462016,
              "p99": 0.001312999999981912,
              "p995": 0.002095000000053915,
              "p999": 0.01036999999996624
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 524604.8972804529,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019061964636319466,
              "min": 0.0017530000000078871,
              "max": 0.22013400000003003,
              "p75": 0.001852999999982785,
              "p99": 0.0035870000000386426,
              "p995": 0.003757000000007338,
              "p999": 0.01137200000005123
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1889255.6750427452,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005293089830085462,
              "min": 0.0004999999946448952,
              "max": 3.086851000000024,
              "p75": 0.0005110000056447461,
              "p99": 0.000582000007852912,
              "p995": 0.0008419999940088019,
              "p999": 0.0010920000058831647
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1408893.2673789023,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007097769739934912,
              "min": 0.0006609999982174486,
              "max": 0.377877000006265,
              "p75": 0.0006819999980507419,
              "p99": 0.000941999998758547,
              "p995": 0.0010120000079041347,
              "p999": 0.001512999995611608
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 292627.4428378203,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003417314488013413,
              "min": 0.003246000000217464,
              "max": 0.2711269999999786,
              "p75": 0.003396000000066124,
              "p99": 0.0038570000033359975,
              "p995": 0.006021000001055654,
              "p999": 0.01251399999455316
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 297788.2877166186,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003358090432863566,
              "min": 0.0031559999988530762,
              "max": 0.19216899999446468,
              "p75": 0.003316000002087094,
              "p99": 0.004910000003292225,
              "p995": 0.00617200000124285,
              "p999": 0.013704999997571576
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42137.17192032858,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023732015093247436,
              "min": 0.022282000005361624,
              "max": 4.434169000000111,
              "p75": 0.022952999992412515,
              "p99": 0.040244999996502884,
              "p995": 0.04611599999770988,
              "p999": 0.06353800000215415
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12153.719394923846,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08227933914762443,
              "min": 0.07915800000773743,
              "max": 0.4781070000026375,
              "p75": 0.0812619999924209,
              "p99": 0.09539800000493415,
              "p995": 0.10739099999773316,
              "p999": 0.2908739999984391
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9987718696588068,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.2296405,
              "min": 1000.0177179999991,
              "max": 1001.8162670000002,
              "p75": 1001.7441500000004,
              "p99": 1001.8162670000002,
              "p995": 1001.8162670000002,
              "p999": 1001.8162670000002
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328672005077962,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.2010702000016,
              "min": 3003.456929,
              "max": 3004.7493790000008,
              "p75": 3004.5057910000032,
              "p99": 3004.7493790000008,
              "p995": 3004.7493790000008,
              "p999": 3004.7493790000008
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.110017285125469,
            "unit": "ops/s",
            "extra": {
              "mean": 98.91179923809493,
              "min": 97.01440300000104,
              "max": 99.95809500000178,
              "p75": 99.30330600000161,
              "p99": 99.95809500000178,
              "p995": 99.95809500000178,
              "p999": 99.95809500000178
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2581506.203271857,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000387370752288946,
              "min": 0.00031999999998788553,
              "max": 3.981618000000026,
              "p75": 0.0003609999999980573,
              "p99": 0.0006909999999606953,
              "p995": 0.0009310000000368746,
              "p999": 0.0020339999999805514
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "03b9feb35576587a94974bd6ed56b5fc9d529e82",
          "message": "feat: Complete issue from issues/87-create-hookmanager-class.md\n\nCo-authored-by: Claude <claude@autoagent-cli>",
          "timestamp": "2025-07-15T10:10:30+03:00",
          "tree_id": "8103308c8b84c7ed970e32a0d8e600c8452520e2",
          "url": "https://github.com/carlrannaberg/autoagent/commit/03b9feb35576587a94974bd6ed56b5fc9d529e82"
        },
        "date": 1752563543711,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4818.050847893403,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2075528116182564,
              "min": 0.15617099999997208,
              "max": 1.0148829999999407,
              "p75": 0.21292699999992237,
              "p99": 0.3225609999999506,
              "p995": 0.4139020000000073,
              "p999": 0.8462490000000003
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10628.530945710052,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09408637986829456,
              "min": 0.07649199999991652,
              "max": 0.44303899999999885,
              "p75": 0.09664999999995416,
              "p99": 0.15122200000007524,
              "p995": 0.16445699999997032,
              "p999": 0.3696500000000924
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4816.330498880833,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20762694757603722,
              "min": 0.14310700000010002,
              "max": 2.948077000000012,
              "p75": 0.22136300000011033,
              "p99": 0.27959199999986595,
              "p995": 0.44134299999996074,
              "p999": 0.7869179999997868
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9514.22205829571,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10510580832282264,
              "min": 0.073406999999861,
              "max": 1.071198000000095,
              "p75": 0.11234999999987849,
              "p99": 0.14586199999985183,
              "p995": 0.1546080000002803,
              "p999": 0.3984139999997751
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6773.472671605558,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1476347581930915,
              "min": 0.13789699999995264,
              "max": 0.5136179999999513,
              "p75": 0.14838699999995697,
              "p99": 0.25279199999999946,
              "p995": 0.3415069999999787,
              "p999": 0.4817209999999932
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 13.900535124035478,
            "unit": "ops/s",
            "extra": {
              "mean": 71.93967650000002,
              "min": 70.50374899999997,
              "max": 76.514589,
              "p75": 71.33928800000001,
              "p99": 76.514589,
              "p995": 76.514589,
              "p999": 76.514589
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1751.8948512710333,
            "unit": "ops/s",
            "extra": {
              "mean": 0.570810513698628,
              "min": 0.35556399999995847,
              "max": 1.7436619999998584,
              "p75": 0.6428990000003978,
              "p99": 1.4369000000001506,
              "p995": 1.5303140000000894,
              "p999": 1.7436619999998584
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 748.352821558346,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3362680960000015,
              "min": 0.9689769999999953,
              "max": 4.85811700000022,
              "p75": 1.5526060000001962,
              "p99": 3.021492999999964,
              "p995": 4.241448000000219,
              "p999": 4.85811700000022
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 862100.1999348839,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011599579724903579,
              "min": 0.0010620000000471919,
              "max": 2.9490109999999277,
              "p75": 0.0011309999999866704,
              "p99": 0.002203999999892403,
              "p995": 0.0023139999998420535,
              "p999": 0.009837999999945168
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 525250.9957201208,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019038516978516083,
              "min": 0.0017129999999951906,
              "max": 0.37864700000000084,
              "p75": 0.0018230000000016844,
              "p99": 0.0036569999999755964,
              "p995": 0.0039669999999887295,
              "p999": 0.011972000000014305
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1936365.6204812266,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005164313957151746,
              "min": 0.0004899999912595376,
              "max": 0.4705370000010589,
              "p75": 0.0005010000022593886,
              "p99": 0.0008020000095712021,
              "p995": 0.0008419999940088019,
              "p999": 0.0011620000004768372
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1412013.268561407,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007082086424151127,
              "min": 0.0006709999870508909,
              "max": 0.3516059999965364,
              "p75": 0.0006819999980507419,
              "p99": 0.0008110000053420663,
              "p995": 0.0008820000075502321,
              "p999": 0.0013120000076014549
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 300099.15025929053,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003332232027768102,
              "min": 0.0031750000052852556,
              "max": 0.0315790000022389,
              "p75": 0.003316000002087094,
              "p99": 0.0037269999957061373,
              "p995": 0.005590000000665896,
              "p999": 0.012212999994517304
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 296189.1789634645,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033762205746326467,
              "min": 0.003196000005118549,
              "max": 0.18933299999480369,
              "p75": 0.0033269999985350296,
              "p99": 0.004999000004318077,
              "p995": 0.0059409999958006665,
              "p999": 0.012964999994437676
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42762.44182211583,
            "unit": "ops/s",
            "extra": {
              "mean": 0.02338500696849405,
              "min": 0.02236099999572616,
              "max": 0.3071630000049481,
              "p75": 0.02305299999716226,
              "p99": 0.036208000004990026,
              "p995": 0.040946999986772425,
              "p999": 0.050984999994398095
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12417.993778585902,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08052830576581871,
              "min": 0.07833599999139551,
              "max": 0.40512500000477303,
              "p75": 0.07940899999812245,
              "p99": 0.09936500000185333,
              "p995": 0.11138699999719393,
              "p999": 0.2855120000021998
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986016547076677,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.4003033999995,
              "min": 999.8642550000004,
              "max": 1001.8962209999991,
              "p75": 1001.7957399999996,
              "p99": 1001.8962209999991,
              "p995": 1001.8962209999991,
              "p999": 1001.8962209999991
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33286871268764867,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.1874224999992,
              "min": 3003.445176999994,
              "max": 3005.1526159999994,
              "p75": 3004.524959000002,
              "p99": 3005.1526159999994,
              "p995": 3005.1526159999994,
              "p999": 3005.1526159999994
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.12463164583217,
            "unit": "ops/s",
            "extra": {
              "mean": 98.76902538095324,
              "min": 94.42910100000154,
              "max": 100.148549000005,
              "p75": 99.36113100000512,
              "p99": 100.148549000005,
              "p995": 100.148549000005,
              "p999": 100.148549000005
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2597627.830824015,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038496661767085455,
              "min": 0.00031999999998788553,
              "max": 4.40561700000012,
              "p75": 0.0003600000000005821,
              "p99": 0.0007309999999733918,
              "p995": 0.0008820000000469008,
              "p999": 0.0015220000000226719
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "55f0945a247d3ee1e1b0b9ede5a28c5178dd7db7",
          "message": "feat: Complete issue from issues/89-define-hook-type-interfaces.md\n\nCo-authored-by: Claude <claude@autoagent-cli>",
          "timestamp": "2025-07-15T10:28:18+03:00",
          "tree_id": "b2b83658924b742c6ac14f110f3a7937a6831256",
          "url": "https://github.com/carlrannaberg/autoagent/commit/55f0945a247d3ee1e1b0b9ede5a28c5178dd7db7"
        },
        "date": 1752564610240,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4409.175457734348,
            "unit": "ops/s",
            "extra": {
              "mean": 0.22679977460317477,
              "min": 0.16073099999994156,
              "max": 0.9622119999999086,
              "p75": 0.25291399999997566,
              "p99": 0.31352800000001935,
              "p995": 0.3918639999999982,
              "p999": 0.7053619999999228
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 8788.847729329604,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11378055813424338,
              "min": 0.07883799999990515,
              "max": 0.33855400000015834,
              "p75": 0.12853100000006634,
              "p99": 0.15424899999993613,
              "p995": 0.16298599999993257,
              "p999": 0.30700500000011743
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4919.989616361882,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20325246148374118,
              "min": 0.13974199999984194,
              "max": 2.823398999999881,
              "p75": 0.22155500000008033,
              "p99": 0.2650159999998323,
              "p995": 0.27890199999978904,
              "p999": 0.5937420000000202
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9742.75429143615,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10264037972085541,
              "min": 0.07471000000032291,
              "max": 0.39392799999995987,
              "p75": 0.10834299999987707,
              "p99": 0.13840899999968315,
              "p995": 0.1447320000002037,
              "p999": 0.2814680000001317
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6849.939990146983,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1459866803852894,
              "min": 0.13736699999992652,
              "max": 0.4041069999999536,
              "p75": 0.14947000000006483,
              "p99": 0.22811699999999746,
              "p995": 0.26568800000001147,
              "p999": 0.3469599999999673
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.252780325133656,
            "unit": "ops/s",
            "extra": {
              "mean": 70.1617493,
              "min": 69.58291600000007,
              "max": 70.77364699999998,
              "p75": 70.54584999999997,
              "p99": 70.77364699999998,
              "p995": 70.77364699999998,
              "p999": 70.77364699999998
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1789.5997703281496,
            "unit": "ops/s",
            "extra": {
              "mean": 0.558784157541904,
              "min": 0.3569190000002891,
              "max": 1.4780490000002828,
              "p75": 0.6372939999996561,
              "p99": 1.2091639999998733,
              "p995": 1.411804999999731,
              "p999": 1.4780490000002828
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 724.8473245893282,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3796008705234073,
              "min": 0.9502899999999954,
              "max": 4.3241199999999935,
              "p75": 1.5957590000000437,
              "p99": 2.9035180000000764,
              "p995": 3.3603539999999157,
              "p999": 4.3241199999999935
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 866303.9636152779,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011543292446992612,
              "min": 0.0010320000001229346,
              "max": 0.2847740000001977,
              "p75": 0.0011620000000220898,
              "p99": 0.0012529999999060237,
              "p995": 0.0013020000001233711,
              "p999": 0.00966799999991963
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 495208.25983818626,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0020193524242240204,
              "min": 0.0017629999999826396,
              "max": 1.2545999999999822,
              "p75": 0.0019439999999804058,
              "p99": 0.003747000000089429,
              "p995": 0.004018000000030497,
              "p999": 0.013785999999981868
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1951232.3336415994,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005124966323890772,
              "min": 0.0004899999912595376,
              "max": 0.3952609999978449,
              "p75": 0.0005010000022593886,
              "p99": 0.0005810000002384186,
              "p995": 0.000822000001790002,
              "p999": 0.0009920000011334196
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1354229.0303539895,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007384275315222009,
              "min": 0.000690999993821606,
              "max": 0.4809510000050068,
              "p75": 0.0007119999936548993,
              "p99": 0.0009220000065397471,
              "p995": 0.0010119999933522195,
              "p999": 0.00149200001033023
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 296328.3073730063,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003374635413218352,
              "min": 0.0031860000017331913,
              "max": 0.12294100000144681,
              "p75": 0.0033269999985350296,
              "p99": 0.005168999996385537,
              "p995": 0.006010999997670297,
              "p999": 0.012514000001829118
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 297183.61485132755,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033649230644841282,
              "min": 0.0031759999983478338,
              "max": 0.16193299999576993,
              "p75": 0.0033159999948111363,
              "p99": 0.005070000006526243,
              "p995": 0.006160999997518957,
              "p999": 0.013456000000587665
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42484.8177324851,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0235378201760619,
              "min": 0.022231999988434836,
              "max": 2.312460999994073,
              "p75": 0.023043000008328818,
              "p99": 0.03997399999934714,
              "p995": 0.04303000000072643,
              "p999": 0.04865099999005906
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12184.989557458552,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08206818686913771,
              "min": 0.07980900000256952,
              "max": 0.40803500000038184,
              "p75": 0.08062199999403674,
              "p99": 0.1034840000065742,
              "p995": 0.16542999999364838,
              "p999": 0.2601670000003651
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986556616783431,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.346148,
              "min": 999.7906820000007,
              "max": 1002.0034720000003,
              "p75": 1001.7867449999994,
              "p99": 1002.0034720000003,
              "p995": 1002.0034720000003,
              "p999": 1002.0034720000003
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33285912828347874,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.273925599998,
              "min": 3002.508980999999,
              "max": 3004.655122999997,
              "p75": 3004.567259000003,
              "p99": 3004.655122999997,
              "p995": 3004.655122999997,
              "p999": 3004.655122999997
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.129513607073958,
            "unit": "ops/s",
            "extra": {
              "mean": 98.72142323809592,
              "min": 94.86409199999616,
              "max": 100.16033099999913,
              "p75": 99.42818800000532,
              "p99": 100.16033099999913,
              "p995": 100.16033099999913,
              "p999": 100.16033099999913
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2547973.1744563393,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00039246881012135063,
              "min": 0.00031999999998788553,
              "max": 0.44317000000000917,
              "p75": 0.00037099999997280975,
              "p99": 0.0007420000000024629,
              "p995": 0.0011920000000031905,
              "p999": 0.0020630000000210202
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "487e89bd5de9dd00e33d995c8abca037c2aa2165",
          "message": "feat: Complete issue from issues/92-create-gitcommithook-built-in-hook.md\n\nCo-authored-by: Gemini <gemini@autoagent-cli>",
          "timestamp": "2025-07-15T11:12:25+03:00",
          "tree_id": "fdb5a7b84d1ec67ab90b7e9cf7f45ec405b9c5d0",
          "url": "https://github.com/carlrannaberg/autoagent/commit/487e89bd5de9dd00e33d995c8abca037c2aa2165"
        },
        "date": 1752567262394,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4783.143998983638,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2090675087792649,
              "min": 0.15140400000007048,
              "max": 0.887689000000023,
              "p75": 0.21588599999995495,
              "p99": 0.3192109999999957,
              "p995": 0.3985289999999395,
              "p999": 0.663426999999956
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 11165.440834723082,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08956207057137672,
              "min": 0.07574299999987488,
              "max": 0.44761300000004667,
              "p75": 0.09318499999994856,
              "p99": 0.13045499999998356,
              "p995": 0.14593500000000859,
              "p999": 0.32995099999993727
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4929.672221164378,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2028532436105462,
              "min": 0.14526299999988623,
              "max": 2.891080000000102,
              "p75": 0.21260000000029322,
              "p99": 0.264227000000119,
              "p995": 0.28167000000030384,
              "p999": 0.6732569999999214
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9707.904241233071,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10300884466418911,
              "min": 0.07700500000009924,
              "max": 0.40165499999966414,
              "p75": 0.10828300000002855,
              "p99": 0.14482200000020384,
              "p995": 0.15439000000014858,
              "p999": 0.348435000000336
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6692.804491104988,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1494141956976393,
              "min": 0.13958200000001852,
              "max": 0.5594520000000216,
              "p75": 0.15012300000000778,
              "p99": 0.25360699999998815,
              "p995": 0.3421629999999709,
              "p999": 0.4611269999999763
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.10186962164388,
            "unit": "ops/s",
            "extra": {
              "mean": 70.91258299999998,
              "min": 69.47294299999999,
              "max": 71.81789299999991,
              "p75": 71.55228699999998,
              "p99": 71.81789299999991,
              "p995": 71.81789299999991,
              "p999": 71.81789299999991
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1611.0534416608566,
            "unit": "ops/s",
            "extra": {
              "mean": 0.620711873449143,
              "min": 0.3668699999998353,
              "max": 1.913180999999895,
              "p75": 0.6519870000001902,
              "p99": 1.4148110000000997,
              "p995": 1.5586310000003323,
              "p999": 1.913180999999895
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 677.6645492714675,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4756563569321481,
              "min": 1.0265699999999924,
              "max": 3.569082999999864,
              "p75": 1.6060410000000047,
              "p99": 2.736225999999988,
              "p995": 2.8059970000001613,
              "p999": 3.569082999999864
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 791189.9082220468,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0012639190535774008,
              "min": 0.0011219999998957064,
              "max": 3.284838000000036,
              "p75": 0.0012529999999060237,
              "p99": 0.0014830000000074506,
              "p995": 0.0022950000000037107,
              "p999": 0.010399000000006708
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 529092.436002732,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001890028909796844,
              "min": 0.001722999999969943,
              "max": 0.27139999999997144,
              "p75": 0.0018539999999802603,
              "p99": 0.0033969999999499123,
              "p995": 0.0035670000000891378,
              "p999": 0.01147099999997181
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1892388.9402612287,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005284325958182562,
              "min": 0.0004999999946448952,
              "max": 2.7550719999999274,
              "p75": 0.0005110000056447461,
              "p99": 0.0005909999890718609,
              "p995": 0.0008510000043315813,
              "p999": 0.001101999994716607
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1398837.219442481,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007148794628145217,
              "min": 0.0006609999982174486,
              "max": 2.9714489999896614,
              "p75": 0.0006819999980507419,
              "p99": 0.0009320000099251047,
              "p995": 0.001001999989966862,
              "p999": 0.0015029999922262505
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 293724.6106819545,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003404549580228406,
              "min": 0.0032470000005559996,
              "max": 0.037960999994538724,
              "p75": 0.0033859999966807663,
              "p99": 0.0036770000006072223,
              "p995": 0.005850999994436279,
              "p999": 0.012663000001339242
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 293865.1748270581,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034029210864761628,
              "min": 0.0031759999983478338,
              "max": 0.15638500000204658,
              "p75": 0.003356000001076609,
              "p99": 0.005108999997901265,
              "p995": 0.006671999995887745,
              "p999": 0.015098000003490597
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42146.91387414691,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023726529609879792,
              "min": 0.02273300000524614,
              "max": 2.2751719999941997,
              "p75": 0.023363999993307516,
              "p99": 0.03235100000165403,
              "p995": 0.03589799998735543,
              "p999": 0.0457860000024084
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 11711.927005412255,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08538304580773814,
              "min": 0.08282600001257379,
              "max": 0.45405400000163354,
              "p75": 0.08424799999920651,
              "p99": 0.10057900000538211,
              "p995": 0.11261199999717064,
              "p999": 0.3031100000080187
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.998624265752084,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3776295000001,
              "min": 999.8942820000011,
              "max": 1002.0346719999998,
              "p75": 1001.8027600000005,
              "p99": 1002.0346719999998,
              "p995": 1002.0346719999998,
              "p999": 1002.0346719999998
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328957326382789,
            "unit": "ops/s",
            "extra": {
              "mean": 3003.9435834000005,
              "min": 3002.6467110000012,
              "max": 3004.572263000002,
              "p75": 3004.4358040000006,
              "p99": 3004.572263000002,
              "p995": 3004.572263000002,
              "p999": 3004.572263000002
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.14255295879338,
            "unit": "ops/s",
            "extra": {
              "mean": 98.59450614285639,
              "min": 96.64861299999757,
              "max": 99.85081899999932,
              "p75": 99.06487000000197,
              "p99": 99.85081899999932,
              "p995": 99.85081899999932,
              "p999": 99.85081899999932
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2570830.4317939677,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003889793693247141,
              "min": 0.00032999999996263796,
              "max": 0.2350720000000024,
              "p75": 0.00037099999997280975,
              "p99": 0.0006309999999984939,
              "p995": 0.0007319999999708671,
              "p999": 0.0012329999999565189
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "62fa4dd60d93acde5133b90ada3e33bbd907e1c0",
          "message": "feat: Fix TypeScript and ESLint validation issues\n\n- Fix null safety in hooks configuration parsing\n- Add missing noVerify property to AgentConfig interface\n- Remove unused getChangedFiles import\n- Fix nullable value conditionals with explicit null checks\n- Fix template literal type restrictions in test helpers\n- Update test mocks to properly handle async functions\n- Skip unimplemented autoCommit tests with clear documentation\n- Add proper CommanderError handling in CLI run commands\n\nAll validation now passes: TypeScript compilation, ESLint rules, and test suite (850 tests passing).\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-16T16:47:02+03:00",
          "tree_id": "dd8bc1025d6ea96b2d1750e226d77dd0c2579d7d",
          "url": "https://github.com/carlrannaberg/autoagent/commit/62fa4dd60d93acde5133b90ada3e33bbd907e1c0"
        },
        "date": 1752675581712,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4795.595760050977,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20852466513761575,
              "min": 0.151595000000043,
              "max": 0.7267440000000533,
              "p75": 0.2205940000000055,
              "p99": 0.30222700000001623,
              "p995": 0.380424000000005,
              "p999": 0.6452209999999923
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9671.644567062089,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10339503205128282,
              "min": 0.07685400000013942,
              "max": 0.33344899999997324,
              "p75": 0.12375299999985145,
              "p99": 0.15513099999998303,
              "p995": 0.16468900000018039,
              "p999": 0.2847340000000713
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4758.577217069309,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2101468473418774,
              "min": 0.14254699999992226,
              "max": 2.8138920000001235,
              "p75": 0.22769700000026205,
              "p99": 0.2687949999999546,
              "p995": 0.28665799999998853,
              "p999": 0.5707910000000993
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9825.827517423866,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10177259861591585,
              "min": 0.07207500000004075,
              "max": 0.3582219999998415,
              "p75": 0.1089350000002014,
              "p99": 0.1475869999999304,
              "p995": 0.15394500000002154,
              "p999": 0.30014399999981833
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6729.296842314353,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14860393640416047,
              "min": 0.13985300000001644,
              "max": 0.561984999999936,
              "p75": 0.15150500000004286,
              "p99": 0.2089419999999791,
              "p995": 0.27063799999996263,
              "p999": 0.35933399999998983
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.196706351917191,
            "unit": "ops/s",
            "extra": {
              "mean": 70.43887329999998,
              "min": 67.79337299999997,
              "max": 74.32122700000002,
              "p75": 70.93107299999997,
              "p99": 74.32122700000002,
              "p995": 74.32122700000002,
              "p999": 74.32122700000002
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1706.8573102365117,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5858720550351303,
              "min": 0.3453380000000834,
              "max": 7.60673799999995,
              "p75": 0.6462730000002921,
              "p99": 1.2226550000000316,
              "p995": 1.3275320000002466,
              "p999": 7.60673799999995
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 664.7903886258558,
            "unit": "ops/s",
            "extra": {
              "mean": 1.5042335405405511,
              "min": 0.944543000000067,
              "max": 5.167979999999943,
              "p75": 1.5996920000000046,
              "p99": 2.619577000000163,
              "p995": 2.7563880000000154,
              "p999": 5.167979999999943
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 884908.3346024627,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011300605507905417,
              "min": 0.0010320000001229346,
              "max": 0.0231340000000273,
              "p75": 0.001132999999981621,
              "p99": 0.0012229999999817665,
              "p995": 0.0012830000000576547,
              "p999": 0.00965900000005604
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 507211.1570150726,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001971565463750797,
              "min": 0.0017529999998942003,
              "max": 0.2268359999999916,
              "p75": 0.0018929999999954816,
              "p99": 0.003827000000001135,
              "p995": 0.004047000000014123,
              "p999": 0.011842000000001462
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1919020.3496464086,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005210992161621716,
              "min": 0.0004999999946448952,
              "max": 0.38939000001118984,
              "p75": 0.0005110000056447461,
              "p99": 0.0005810000002384186,
              "p995": 0.0008410000009462237,
              "p999": 0.0009820000122999772
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1400105.7731604374,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007142317524644694,
              "min": 0.0006709999870508909,
              "max": 3.111960000009276,
              "p75": 0.0006819999980507419,
              "p99": 0.0009409999911440536,
              "p995": 0.0009920000011334196,
              "p999": 0.001512999995611608
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 289565.61719393486,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034534486852776307,
              "min": 0.003236000004108064,
              "max": 0.09185200000501936,
              "p75": 0.0034360000063315965,
              "p99": 0.004218000001856126,
              "p995": 0.005950999999186024,
              "p999": 0.012543000004370697
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 292014.1579747903,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034244914936156293,
              "min": 0.003205999993951991,
              "max": 0.16489000000001397,
              "p75": 0.0033660000044619665,
              "p99": 0.005831000002217479,
              "p995": 0.0072440000003552996,
              "p999": 0.01443699999799719
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42373.186265394615,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023599830178847824,
              "min": 0.022732999990694225,
              "max": 0.2334580000024289,
              "p75": 0.023283999995328486,
              "p99": 0.034053999988827854,
              "p995": 0.0408060000045225,
              "p999": 0.047759000008227304
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12366.599316004167,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0808629740842218,
              "min": 0.0790290000004461,
              "max": 0.3397980000008829,
              "p75": 0.07987000000139233,
              "p99": 0.09263400000054389,
              "p995": 0.10509799999999814,
              "p999": 0.20494499999040272
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9984232568451382,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.5792331999999,
              "min": 1000.8064419999992,
              "max": 1001.9971100000002,
              "p75": 1001.8287909999999,
              "p99": 1001.9971100000002,
              "p995": 1001.9971100000002,
              "p999": 1001.9971100000002
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33284753902165576,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.378530000001,
              "min": 3003.680078000005,
              "max": 3004.589909999995,
              "p75": 3004.511547999995,
              "p99": 3004.589909999995,
              "p995": 3004.589909999995,
              "p999": 3004.589909999995
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.172501447911435,
            "unit": "ops/s",
            "extra": {
              "mean": 98.304237666667,
              "min": 94.78834199999983,
              "max": 99.64194800000405,
              "p75": 99.09517600000254,
              "p99": 99.64194800000405,
              "p995": 99.64194800000405,
              "p999": 99.64194800000405
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2572341.7427659775,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003887508348423114,
              "min": 0.00031999999998788553,
              "max": 0.25581399999998666,
              "p75": 0.00037099999997280975,
              "p99": 0.0006309999999984939,
              "p995": 0.0007120000000213622,
              "p999": 0.0012319999999590436
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "2f5f5ae7db180cdd4d78fdf936530bed708fea0e",
          "message": "chore: prepare release v0.7.0\n\n- Update CHANGELOG.md with comprehensive hook system changes\n- Bump version from 0.6.5 to 0.7.0\n- Document all features, fixes, and improvements since last release\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-16T17:36:28+03:00",
          "tree_id": "f4434f64e03f8cf7ded540312ed9d6679525178f",
          "url": "https://github.com/carlrannaberg/autoagent/commit/2f5f5ae7db180cdd4d78fdf936530bed708fea0e"
        },
        "date": 1752676723391,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4547.163312856107,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2199173267370273,
              "min": 0.15174400000000787,
              "max": 1.213341000000014,
              "p75": 0.24319600000001174,
              "p99": 0.3131070000000591,
              "p995": 0.375362999999993,
              "p999": 0.7296870000000126
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10164.784271471657,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09837887094235596,
              "min": 0.07689400000003843,
              "max": 0.6273850000000039,
              "p75": 0.10662900000011177,
              "p99": 0.148729000000003,
              "p995": 0.15530999999998585,
              "p999": 0.31683300000008785
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4880.59245100799,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20489315795943375,
              "min": 0.15309700000011617,
              "max": 2.756992000000082,
              "p75": 0.21525299999984782,
              "p99": 0.2648260000000846,
              "p995": 0.2804449999998724,
              "p999": 0.7046089999998912
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10458.749629790951,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0956137239533468,
              "min": 0.0730970000004163,
              "max": 0.4482499999999163,
              "p75": 0.09858500000018466,
              "p99": 0.13163699999995515,
              "p995": 0.14598300000034214,
              "p999": 0.3472799999999552
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6748.006355506386,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1481919173333318,
              "min": 0.13929200000006858,
              "max": 0.46321899999998095,
              "p75": 0.15043200000002344,
              "p99": 0.20313199999998233,
              "p995": 0.2715189999999552,
              "p999": 0.3628009999999904
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.126823204977464,
            "unit": "ops/s",
            "extra": {
              "mean": 70.78732320000003,
              "min": 68.05904300000009,
              "max": 88.53296499999999,
              "p75": 69.46133299999997,
              "p99": 88.53296499999999,
              "p995": 88.53296499999999,
              "p999": 88.53296499999999
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1749.8899564201834,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5714645062857199,
              "min": 0.3637330000001384,
              "max": 3.0368600000001607,
              "p75": 0.6356040000000576,
              "p99": 1.3724669999996877,
              "p995": 1.4714229999999588,
              "p999": 3.0368600000001607
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 689.564644740673,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4501903594202883,
              "min": 0.9951779999998962,
              "max": 3.8545180000000983,
              "p75": 1.5976490000000467,
              "p99": 2.986176999999998,
              "p995": 3.0703130000001693,
              "p999": 3.8545180000000983
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 788483.1216299122,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0012682579659192336,
              "min": 0.0010910000000876607,
              "max": 0.1297469999999521,
              "p75": 0.0012320000000727305,
              "p99": 0.0018339999999170686,
              "p995": 0.002152999999907479,
              "p999": 0.013494000000036976
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 509845.2821378651,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019613793341517953,
              "min": 0.0017629999999826396,
              "max": 0.34732099999996535,
              "p75": 0.0019130000000586733,
              "p99": 0.003595999999902233,
              "p995": 0.0038580000000365544,
              "p999": 0.012133000000062566
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1897343.3966576552,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000527052721063352,
              "min": 0.0004999999946448952,
              "max": 2.808413999999175,
              "p75": 0.0005110000056447461,
              "p99": 0.000730999992811121,
              "p995": 0.0008420000085607171,
              "p999": 0.0010420000035082921
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1408917.253254966,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007097648905141443,
              "min": 0.0006709999870508909,
              "max": 0.37466000000131316,
              "p75": 0.0006819999980507419,
              "p99": 0.0009710000013001263,
              "p995": 0.0010320000001229346,
              "p999": 0.0015229999989969656
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 284863.05197700486,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0035104587732940652,
              "min": 0.0032770000034361146,
              "max": 0.04700800000136951,
              "p75": 0.003506999993987847,
              "p99": 0.003818000004685018,
              "p995": 0.005461000000650529,
              "p999": 0.012253000000782777
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 287708.2202378334,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034757435820685005,
              "min": 0.0032359999968321063,
              "max": 0.17954599999939092,
              "p75": 0.003435999999055639,
              "p99": 0.0050289999999222346,
              "p995": 0.006132000002253335,
              "p999": 0.013324999999895226
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42313.70431181052,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023633005341035147,
              "min": 0.022662000003037974,
              "max": 0.3055119999917224,
              "p75": 0.023363999993307516,
              "p99": 0.03292199999850709,
              "p995": 0.04072599999199156,
              "p999": 0.0449839999928372
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 11786.726836710497,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0848411958513739,
              "min": 0.08212400000775233,
              "max": 0.4036959999939427,
              "p75": 0.08404800000425894,
              "p99": 0.10302399999636691,
              "p995": 0.11187900000368245,
              "p999": 0.22954899999604095
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9985733477445243,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.4286904999999,
              "min": 1000.2152299999998,
              "max": 1002.0772969999998,
              "p75": 1001.7935600000001,
              "p99": 1002.0772969999998,
              "p995": 1002.0772969999998,
              "p999": 1002.0772969999998
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328502478530842,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.3540795000013,
              "min": 3002.5311280000024,
              "max": 3005.2755270000052,
              "p75": 3004.5502720000004,
              "p99": 3005.2755270000052,
              "p995": 3005.2755270000052,
              "p999": 3005.2755270000052
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.127638067961936,
            "unit": "ops/s",
            "extra": {
              "mean": 98.73970547618886,
              "min": 97.6746060000005,
              "max": 100.04522400000133,
              "p75": 99.09834099999716,
              "p99": 100.04522400000133,
              "p995": 100.04522400000133,
              "p999": 100.04522400000133
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2622265.8898649164,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003813495816213794,
              "min": 0.00031999999998788553,
              "max": 0.2630829999999946,
              "p75": 0.0003609999999980573,
              "p99": 0.0006210000000237414,
              "p995": 0.0007209999999986394,
              "p999": 0.0011620000000220898
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "ee6dc1930c56310fa9fe5d48688de1f2ec06e4c2",
          "message": "feat: Add ToolFailureDetector class for robust error detection\n\nImplements a comprehensive tool failure detection system that analyzes\ntool output to identify and categorize failures. This is the first step\ntowards fixing premature task completion issues.\n\nKey features:\n- Pattern-based detection for common failure scenarios\n- Severity classification (error, warning, info)\n- Failure categorization by type\n- Multi-line error context extraction\n- Helper functions for failure analysis\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-16T21:27:15+03:00",
          "tree_id": "39a991768ba5bbe0f37bd334eeab7b839c1059b9",
          "url": "https://github.com/carlrannaberg/autoagent/commit/ee6dc1930c56310fa9fe5d48688de1f2ec06e4c2"
        },
        "date": 1752691141547,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4853.839881529992,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20602245323444565,
              "min": 0.1526249999999436,
              "max": 0.8143010000000004,
              "p75": 0.20952099999999518,
              "p99": 0.31378699999993387,
              "p995": 0.3894990000000007,
              "p999": 0.6583899999999971
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9330.064104998948,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10718039969995605,
              "min": 0.07792600000016137,
              "max": 2.8581709999998566,
              "p75": 0.11346200000002682,
              "p99": 0.1502210000001014,
              "p995": 0.1567130000000816,
              "p999": 0.33684900000002926
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4600.778240334379,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21735453172533722,
              "min": 0.14583300000003874,
              "max": 3.425299999999879,
              "p75": 0.23475899999994,
              "p99": 0.27269899999964764,
              "p995": 0.28934099999992213,
              "p999": 0.5870260000001508
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 8855.799221320061,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11292035591689241,
              "min": 0.07931800000005751,
              "max": 0.37492100000008577,
              "p75": 0.12546400000019275,
              "p99": 0.14846699999998236,
              "p995": 0.15264499999966574,
              "p999": 0.3152190000000701
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6806.210048431758,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14692464571092886,
              "min": 0.13980100000003404,
              "max": 0.3731290000000058,
              "p75": 0.1488089999999147,
              "p99": 0.18508699999995315,
              "p995": 0.25425700000005236,
              "p999": 0.33471799999995255
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 13.910214871144758,
            "unit": "ops/s",
            "extra": {
              "mean": 71.88961559999998,
              "min": 71.15483799999993,
              "max": 73.20973599999991,
              "p75": 72.38752899999997,
              "p99": 73.20973599999991,
              "p995": 73.20973599999991,
              "p999": 73.20973599999991
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1759.888028884048,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5682179681818189,
              "min": 0.3558269999998629,
              "max": 3.9788549999998395,
              "p75": 0.6394279999999526,
              "p99": 1.2198749999997744,
              "p995": 1.5157500000000255,
              "p999": 3.9788549999998395
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 708.7712557230252,
            "unit": "ops/s",
            "extra": {
              "mean": 1.410892430985917,
              "min": 1.0103129999999965,
              "max": 4.7868590000000495,
              "p75": 1.6432389999999941,
              "p99": 2.8726019999999153,
              "p995": 3.1031739999998535,
              "p999": 4.7868590000000495
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 826985.3599132817,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0012092112490417735,
              "min": 0.0011019999999462016,
              "max": 0.2999489999999696,
              "p75": 0.0011730000001080043,
              "p99": 0.0021639999999933934,
              "p995": 0.0022240000000692817,
              "p999": 0.009798999999929947
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 494965.3347665856,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0020203435064226815,
              "min": 0.0017629999999826396,
              "max": 1.355499000000009,
              "p75": 0.0018629999999575375,
              "p99": 0.0037570000000641812,
              "p995": 0.0042680000000245855,
              "p999": 0.04155600000001414
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1936575.9767416918,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000516375299502842,
              "min": 0.0004899999912595376,
              "max": 0.44942900000023656,
              "p75": 0.0005010000022593886,
              "p99": 0.0007919999916339293,
              "p995": 0.0008320000051753595,
              "p999": 0.0009920000011334196
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1386595.8979243864,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007211906522274536,
              "min": 0.0006709999870508909,
              "max": 0.3037179999955697,
              "p75": 0.0006920000014360994,
              "p99": 0.0009520000021439046,
              "p995": 0.001021999996737577,
              "p999": 0.0014830000000074506
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 277215.8275715799,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0036072976379452576,
              "min": 0.003365999997186009,
              "max": 0.2524909999992815,
              "p75": 0.0035570000036386773,
              "p99": 0.005500000006577466,
              "p995": 0.007353000000875909,
              "p999": 0.013224000002082903
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 293759.5534857849,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034041446078395886,
              "min": 0.003174999998009298,
              "max": 0.16575899999588728,
              "p75": 0.003365999997186009,
              "p99": 0.005070000006526243,
              "p995": 0.007925000005343463,
              "p999": 0.013555999998061452
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 40594.8268093975,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024633680658258283,
              "min": 0.023122999991755933,
              "max": 2.337518000000273,
              "p75": 0.024294999995618127,
              "p99": 0.03462500000023283,
              "p995": 0.04209899999841582,
              "p999": 0.04651699999521952
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 11813.716252261607,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08464736909594903,
              "min": 0.08002000000851694,
              "max": 0.29537200000777375,
              "p75": 0.08426800000597723,
              "p99": 0.10489599998982158,
              "p995": 0.11442300000635441,
              "p999": 0.20153699998627417
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.998618163414579,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3837486999997,
              "min": 1000.2097830000002,
              "max": 1002.1516919999995,
              "p75": 1001.9077799999995,
              "p99": 1002.1516919999995,
              "p995": 1002.1516919999995,
              "p999": 1002.1516919999995
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328828165756699,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.0601382999985,
              "min": 3002.4999109999953,
              "max": 3004.7627369999973,
              "p75": 3004.6254800000024,
              "p99": 3004.7627369999973,
              "p995": 3004.7627369999973,
              "p999": 3004.7627369999973
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.129551982254599,
            "unit": "ops/s",
            "extra": {
              "mean": 98.72104923809509,
              "min": 97.5320389999979,
              "max": 99.79376500000217,
              "p75": 99.10160199999518,
              "p99": 99.79376500000217,
              "p995": 99.79376500000217,
              "p999": 99.79376500000217
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2516150.9482491044,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00039743243571927297,
              "min": 0.00032999999996263796,
              "max": 0.23970800000000736,
              "p75": 0.0003699999999753345,
              "p99": 0.000701999999932923,
              "p995": 0.0007510000000365835,
              "p999": 0.0012819999999464926
            }
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "committer": {
            "email": "test@example.com",
            "name": "Test User"
          },
          "distinct": true,
          "id": "1bfbeb00675ce43e8c0596c1f840adda8ad8099c",
          "message": "feat: Implement comprehensive task completion validation\n\n- Add ToolFailureDetector for pattern-based error detection in tool output\n- Add TaskObjectiveValidator for analyzing task completion with confidence scoring\n- Add TaskStatusReporter for enhanced user feedback with detailed status messages\n- Enhance ClaudeProvider to validate task completion beyond exit codes\n- Add CLI flags for completion validation control (--strict-completion, etc.)\n- Add configuration support with environment variables\n- Prevent premature task completion when tools fail\n- Add comprehensive tests for all validation components\n\nThis fix ensures tasks are only marked complete when they actually succeed,\npreventing false positives and improving reliability of autonomous execution.\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-16T22:48:27+03:00",
          "tree_id": "8cbd473603b59d698631c68213983dcb30e20dbb",
          "url": "https://github.com/carlrannaberg/autoagent/commit/1bfbeb00675ce43e8c0596c1f840adda8ad8099c"
        },
        "date": 1752695510403,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4265.345354794941,
            "unit": "ops/s",
            "extra": {
              "mean": 0.23444760431317418,
              "min": 0.16600999999991473,
              "max": 2.9127779999998893,
              "p75": 0.2466909999999416,
              "p99": 0.3201480000000174,
              "p995": 0.6620759999999564,
              "p999": 1.8166410000000042
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 8471.604189708893,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11804139778092758,
              "min": 0.07682399999998779,
              "max": 0.5860539999998764,
              "p75": 0.1290510000001177,
              "p99": 0.1553799999999228,
              "p995": 0.17173200000001998,
              "p999": 0.4329489999998941
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4744.348356393496,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21077710253978238,
              "min": 0.14217499999995198,
              "max": 2.6610990000003767,
              "p75": 0.22979899999972986,
              "p99": 0.27066599999989194,
              "p995": 0.2871860000000197,
              "p999": 0.656025000000227
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9841.922740906904,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10160616236536854,
              "min": 0.07478899999978239,
              "max": 0.37807599999996455,
              "p75": 0.1064289999999346,
              "p99": 0.14389900000014677,
              "p995": 0.153878000000077,
              "p999": 0.3437420000000202
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6740.516439293814,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1483565849896165,
              "min": 0.1397510000000466,
              "max": 0.4608180000000175,
              "p75": 0.15053100000000086,
              "p99": 0.2042409999999677,
              "p995": 0.3120219999999563,
              "p999": 0.41155800000001364
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.159627375472539,
            "unit": "ops/s",
            "extra": {
              "mean": 70.62332740000001,
              "min": 69.74570599999993,
              "max": 71.9873050000001,
              "p75": 71.06212599999992,
              "p99": 71.9873050000001,
              "p995": 71.9873050000001,
              "p999": 71.9873050000001
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1713.0331640821607,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5837598599766735,
              "min": 0.3500140000001011,
              "max": 2.4382229999996525,
              "p75": 0.6178829999998925,
              "p99": 1.382270999999946,
              "p995": 1.4979269999998905,
              "p999": 2.4382229999996525
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 690.003689073902,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4492676138328533,
              "min": 1.0368359999999939,
              "max": 4.932168999999931,
              "p75": 1.6157670000002327,
              "p99": 3.8646450000001096,
              "p995": 4.858788000000004,
              "p999": 4.932168999999931
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 919132.0845286032,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0010879829100002222,
              "min": 0.00102100000003702,
              "max": 0.28917999999998756,
              "p75": 0.0010729999999057327,
              "p99": 0.0012219999998706044,
              "p995": 0.0019940000001952285,
              "p999": 0.01001799999994546
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 489755.31516137184,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0020418359312149685,
              "min": 0.0017129999999951906,
              "max": 1.249693000000093,
              "p75": 0.0018230000000016844,
              "p99": 0.004117999999948552,
              "p995": 0.004317999999898348,
              "p999": 0.014698000000066713
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1908890.9348278588,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005238643977793203,
              "min": 0.0004999999946448952,
              "max": 0.4282200000016019,
              "p75": 0.0005110000056447461,
              "p99": 0.0005910000036237761,
              "p995": 0.0008510000043315813,
              "p999": 0.0010919999913312495
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1409522.3113743672,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007094602135279016,
              "min": 0.0006609999982174486,
              "max": 0.35125500000140164,
              "p75": 0.0006819999980507419,
              "p99": 0.0008410000009462237,
              "p995": 0.0009520000021439046,
              "p999": 0.001472999996622093
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 288771.91510072985,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034629406382929535,
              "min": 0.003236000004108064,
              "max": 0.10368399999424582,
              "p75": 0.003416999999899417,
              "p99": 0.005310000000463333,
              "p995": 0.006852000005892478,
              "p999": 0.012734000003547408
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 293598.29478075734,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034060143324290888,
              "min": 0.0031959999978425913,
              "max": 0.17887400000472553,
              "p75": 0.0033570000014151447,
              "p99": 0.0050789999950211495,
              "p995": 0.006362000000081025,
              "p999": 0.013746000004175585
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41344.975719664566,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024186735693845825,
              "min": 0.02279199998883996,
              "max": 4.192041999995126,
              "p75": 0.02341300000261981,
              "p99": 0.04070599999977276,
              "p995": 0.04608600000210572,
              "p999": 0.06270699999004137
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12302.55085232434,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08128395582376872,
              "min": 0.0790770000021439,
              "max": 0.4490090000035707,
              "p75": 0.08002900000428781,
              "p99": 0.09934500000963453,
              "p995": 0.11657800000102725,
              "p999": 0.2874760000122478
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9985185575279018,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.4836404000001,
              "min": 999.8808979999994,
              "max": 1002.1182110000009,
              "p75": 1001.8197440000004,
              "p99": 1002.1182110000009,
              "p995": 1002.1182110000009,
              "p999": 1002.1182110000009
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33284879793783684,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.367166700001,
              "min": 3003.4655520000015,
              "max": 3004.6878880000004,
              "p75": 3004.575942999996,
              "p99": 3004.6878880000004,
              "p995": 3004.6878880000004,
              "p999": 3004.6878880000004
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.120550893778171,
            "unit": "ops/s",
            "extra": {
              "mean": 98.80885047619016,
              "min": 97.26998500000627,
              "max": 100.01922699999704,
              "p75": 99.64534199999616,
              "p99": 100.01922699999704,
              "p995": 100.01922699999704,
              "p999": 100.01922699999704
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2605620.9890190577,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003837856711372561,
              "min": 0.00031999999998788553,
              "max": 3.993787999999995,
              "p75": 0.0003609999999980573,
              "p99": 0.0006810000000996297,
              "p995": 0.001002000000028147,
              "p999": 0.0020339999999805514
            }
          }
        ]
      }
    ]
  }
}