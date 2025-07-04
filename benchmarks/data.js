window.BENCHMARK_DATA = {
  "lastUpdate": 1751664859057,
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
      }
    ]
  }
}