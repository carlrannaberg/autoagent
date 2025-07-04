window.BENCHMARK_DATA = {
  "lastUpdate": 1751646197085,
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
      }
    ]
  }
}