window.BENCHMARK_DATA = {
  "lastUpdate": 1751646936560,
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
      }
    ]
  }
}