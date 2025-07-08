window.BENCHMARK_DATA = {
  "lastUpdate": 1752007975489,
  "repoUrl": "https://github.com/carlrannaberg/autoagent",
  "entries": {
    "Benchmark": [
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
        "date": 1751646387391,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 9844.48150841626,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10157975299614087,
              "min": 0.07769600000005994,
              "max": 1.152625999999998,
              "p75": 0.1080019999999422,
              "p99": 0.17718300000001364,
              "p995": 0.19707100000005084,
              "p999": 0.4945099999999911
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10581.36316662423,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0945057819349971,
              "min": 0.0765440000000126,
              "max": 0.44471899999996367,
              "p75": 0.10679000000004635,
              "p99": 0.1348729999999705,
              "p995": 0.14418099999988954,
              "p999": 0.3642649999999321
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 9692.477716993708,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10317279329378408,
              "min": 0.07471399999985806,
              "max": 2.6634900000003654,
              "p75": 0.10979500000030384,
              "p99": 0.14628300000003946,
              "p995": 0.15406799999982468,
              "p999": 0.37454299999990326
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9820.428417199513,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10182855141519065,
              "min": 0.07420899999988251,
              "max": 0.41544699999985824,
              "p75": 0.11001600000008693,
              "p99": 0.14157499999964784,
              "p995": 0.15164400000003297,
              "p999": 0.35327000000052067
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6700.838892038459,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14923504595643106,
              "min": 0.13906700000006822,
              "max": 0.5010019999999713,
              "p75": 0.1516149999999925,
              "p99": 0.27905500000002803,
              "p995": 0.33518400000002657,
              "p999": 0.4269520000000284
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.080931556582243,
            "unit": "ops/s",
            "extra": {
              "mean": 71.01802859999998,
              "min": 69.80939799999999,
              "max": 75.16434100000004,
              "p75": 70.92851399999995,
              "p99": 75.16434100000004,
              "p995": 75.16434100000004,
              "p999": 75.16434100000004
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1845.242376694513,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5419342264355301,
              "min": 0.3520720000001347,
              "max": 3.9663129999999,
              "p75": 0.6318270000001576,
              "p99": 1.352581999999984,
              "p995": 1.5629770000000462,
              "p999": 3.9663129999999
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 701.951370212977,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4246001111111057,
              "min": 0.9317000000000917,
              "max": 4.961232999999993,
              "p75": 1.6711099999999988,
              "p99": 2.6932600000000093,
              "p995": 2.9514560000000074,
              "p999": 4.961232999999993
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 894568.7010865003,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011178571291231717,
              "min": 0.001040999999986525,
              "max": 0.02612900000008267,
              "p75": 0.00112200000012308,
              "p99": 0.0012019999999210995,
              "p995": 0.0012529999999060237,
              "p999": 0.009538000000020475
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 510089.52255622554,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019604401889861856,
              "min": 0.0018029999999953361,
              "max": 1.435367000000042,
              "p75": 0.0019130000000586733,
              "p99": 0.0035070000000132495,
              "p995": 0.0036069999999881475,
              "p999": 0.011130999999977575
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1904352.8611996798,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005251127668482788,
              "min": 0.0004999999946448952,
              "max": 0.5904239999945275,
              "p75": 0.0005110000056447461,
              "p99": 0.0006010000070091337,
              "p995": 0.0008509999897796661,
              "p999": 0.0012229999992996454
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1407766.958236775,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007103448437605737,
              "min": 0.0006709999870508909,
              "max": 0.36880999999993946,
              "p75": 0.0006819999980507419,
              "p99": 0.0008309999975608662,
              "p995": 0.000981999997748062,
              "p999": 0.0016340000001946464
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 287963.9591097493,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003472656797369835,
              "min": 0.003294999994977843,
              "max": 0.36659599999984493,
              "p75": 0.0034460000024409965,
              "p99": 0.0039969999997993,
              "p995": 0.005941000003076624,
              "p999": 0.012763999999151565
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 288690.53576177487,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003463916810993735,
              "min": 0.0032349999964935705,
              "max": 0.24956699999893317,
              "p75": 0.003405999996175524,
              "p99": 0.0052500000019790605,
              "p995": 0.00647200000094017,
              "p999": 0.014326999997138046
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42174.2609865125,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023711144584603487,
              "min": 0.022783000007621013,
              "max": 0.34259000000020023,
              "p75": 0.023482999997213483,
              "p99": 0.032991000000038184,
              "p995": 0.03965400000743102,
              "p999": 0.045555000004242174
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14678.226471255364,
            "unit": "ops/s",
            "extra": {
              "mean": 0.06812812174265863,
              "min": 0.06615400000009686,
              "max": 0.3946070000092732,
              "p75": 0.06719600000360515,
              "p99": 0.07983999999123625,
              "p995": 0.09050900000147521,
              "p999": 0.296094000004814
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986091141579297,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3928231000006,
              "min": 999.9372830000002,
              "max": 1002.0692400000007,
              "p75": 1001.8082039999999,
              "p99": 1002.0692400000007,
              "p995": 1002.0692400000007,
              "p999": 1002.0692400000007
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33285377364871715,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.322255499999,
              "min": 3003.4524419999943,
              "max": 3005.230156000005,
              "p75": 3004.5116860000016,
              "p99": 3005.230156000005,
              "p995": 3005.230156000005,
              "p999": 3005.230156000005
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.151990408376264,
            "unit": "ops/s",
            "extra": {
              "mean": 98.50285114285708,
              "min": 96.15527099999599,
              "max": 100.20049300000392,
              "p75": 99.29301599999599,
              "p99": 100.20049300000392,
              "p995": 100.20049300000392,
              "p999": 100.20049300000392
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2602000.188365165,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038431972621350935,
              "min": 0.00030999999989944627,
              "max": 4.4531070000000454,
              "p75": 0.0003510000000233049,
              "p99": 0.0007709999999860884,
              "p995": 0.0013020000001233711,
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
          "id": "81404de89247173f648ea8b71c1ec53ab2dabe48",
          "message": "fix: Lower coverage thresholds to match current coverage levels\n\n- Reduce function coverage threshold from 88% to 80%\n- Reduce other thresholds slightly to prevent CI failures\n- Current coverage: 82.66% functions, 46.5% lines/statements",
          "timestamp": "2025-07-04T19:28:51+03:00",
          "tree_id": "869490073682567f86950ab242056c00bce0a54c",
          "url": "https://github.com/carlrannaberg/autoagent/commit/81404de89247173f648ea8b71c1ec53ab2dabe48"
        },
        "date": 1751646655853,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 9244.958925175442,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1081670571057754,
              "min": 0.07615099999998165,
              "max": 2.467677999999978,
              "p75": 0.12204700000006596,
              "p99": 0.15984800000001087,
              "p995": 0.18556599999999435,
              "p999": 0.41664400000001933
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10017.242716485156,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09982786963465724,
              "min": 0.06871799999998984,
              "max": 0.3815509999999449,
              "p75": 0.11338099999989026,
              "p99": 0.1429569999997966,
              "p995": 0.14799600000003466,
              "p999": 0.2994380000000092
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 10195.162856159395,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09808573086165576,
              "min": 0.07096200000000863,
              "max": 2.777219000000059,
              "p75": 0.10351300000002084,
              "p99": 0.14231599999993705,
              "p995": 0.14622300000019095,
              "p999": 0.3130540000001929
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9667.142949775078,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10344317914769914,
              "min": 0.07433799999989787,
              "max": 0.38194300000031944,
              "p75": 0.11863099999982296,
              "p99": 0.1446089999999458,
              "p995": 0.15124199999991106,
              "p999": 0.3054090000000542
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6829.795447626278,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1464172693997086,
              "min": 0.13777700000002824,
              "max": 0.4353510000000824,
              "p75": 0.14784500000007483,
              "p99": 0.251308999999992,
              "p995": 0.2927349999999933,
              "p999": 0.41419100000001663
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.094125786830999,
            "unit": "ops/s",
            "extra": {
              "mean": 70.951545,
              "min": 69.49599899999998,
              "max": 75.16422200000011,
              "p75": 71.7235300000001,
              "p99": 75.16422200000011,
              "p995": 75.16422200000011,
              "p999": 75.16422200000011
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1929.0761808496493,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5183828455958418,
              "min": 0.35140400000000227,
              "max": 2.703690999999708,
              "p75": 0.5609660000000076,
              "p99": 1.1862700000001496,
              "p995": 1.2678949999999531,
              "p999": 2.703690999999708
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 707.0658062730433,
            "unit": "ops/s",
            "extra": {
              "mean": 1.414295516949148,
              "min": 0.9949139999998806,
              "max": 4.0655289999999695,
              "p75": 1.584912999999915,
              "p99": 2.641072000000122,
              "p995": 2.8719590000000608,
              "p999": 4.0655289999999695
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 878352.9775971347,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011384944612308925,
              "min": 0.0010209999998096464,
              "max": 0.26052500000014334,
              "p75": 0.001111999999920954,
              "p99": 0.0021140000001196313,
              "p995": 0.0022639999999682914,
              "p999": 0.010078999999905136
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 542240.7127205421,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0018441994054315433,
              "min": 0.0016829999999572465,
              "max": 1.2070190000000593,
              "p75": 0.0018029999999953361,
              "p99": 0.003417000000013104,
              "p995": 0.003536999999937507,
              "p999": 0.01123100000006616
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1943088.4183293658,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005146446196513193,
              "min": 0.0004899999912595376,
              "max": 0.3875009999901522,
              "p75": 0.0005010000022593886,
              "p99": 0.0007909999985713512,
              "p995": 0.0008309999975608662,
              "p999": 0.0010719999991124496
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1404621.3004637507,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000711935665271372,
              "min": 0.0006709999870508909,
              "max": 0.17995499999960884,
              "p75": 0.0006819999980507419,
              "p99": 0.0008419999940088019,
              "p995": 0.0009620000055292621,
              "p999": 0.001472999996622093
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 296480.61306336924,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033729018220367136,
              "min": 0.0031860000017331913,
              "max": 0.22035099999629892,
              "p75": 0.0033459999976912513,
              "p99": 0.005069999999250285,
              "p995": 0.005770999996457249,
              "p999": 0.012311999998928513
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 293008.7875301179,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003412866926037881,
              "min": 0.003206000001227949,
              "max": 0.1923090000054799,
              "p75": 0.0033669999975245446,
              "p99": 0.005128999997396022,
              "p995": 0.006872999998449814,
              "p999": 0.013534999998228159
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42584.61966215248,
            "unit": "ops/s",
            "extra": {
              "mean": 0.02348265660075298,
              "min": 0.022240999998757616,
              "max": 0.3487699999968754,
              "p75": 0.023194000008516014,
              "p99": 0.03437399999529589,
              "p995": 0.040224000011221506,
              "p999": 0.04472400000668131
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14309.105519414265,
            "unit": "ops/s",
            "extra": {
              "mean": 0.06988557032046644,
              "min": 0.0662129999982426,
              "max": 0.37039999999979045,
              "p75": 0.0700900000083493,
              "p99": 0.0825629999890225,
              "p995": 0.09362499999406282,
              "p999": 0.2079070000036154
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9989018587399469,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.0993485000001,
              "min": 1000.1043599999994,
              "max": 1001.7866479999993,
              "p75": 1001.7026679999999,
              "p99": 1001.7866479999993,
              "p995": 1001.7866479999993,
              "p999": 1001.7866479999993
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328904251304718,
            "unit": "ops/s",
            "extra": {
              "mean": 3003.9914774,
              "min": 3003.3881120000005,
              "max": 3004.851579999995,
              "p75": 3004.452008,
              "p99": 3004.851579999995,
              "p995": 3004.851579999995,
              "p999": 3004.851579999995
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.136109395271598,
            "unit": "ops/s",
            "extra": {
              "mean": 98.65718304761893,
              "min": 97.37392499999987,
              "max": 99.58627200000046,
              "p75": 99.20481800000562,
              "p99": 99.58627200000046,
              "p995": 99.58627200000046,
              "p999": 99.58627200000046
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2620810.191916625,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038156139772514003,
              "min": 0.0003100000000131331,
              "max": 1.174410000000023,
              "p75": 0.0003510000000233049,
              "p99": 0.0007209999999986394,
              "p995": 0.0012830000000576547,
              "p999": 0.0020640000000184955
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
        "date": 1751646938772,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 9189.692733433849,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10881756648530913,
              "min": 0.07500999999996338,
              "max": 0.7884809999999902,
              "p75": 0.12547400000005382,
              "p99": 0.16348499999992328,
              "p995": 0.19610499999998865,
              "p999": 0.39909399999999096
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9246.96006837674,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10814364857266495,
              "min": 0.07599200000004203,
              "max": 0.3299060000000509,
              "p75": 0.12576500000000124,
              "p99": 0.14740400000005138,
              "p995": 0.151882999999998,
              "p999": 0.2878160000000207
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 10441.010217431176,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09577617291576908,
              "min": 0.07447899999988294,
              "max": 2.4891820000002554,
              "p75": 0.10378399999990506,
              "p99": 0.1349720000000616,
              "p995": 0.1469240000001264,
              "p999": 0.2944990000000871
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9250.403195400795,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10810339602247714,
              "min": 0.07542100000000573,
              "max": 0.5443350000000464,
              "p75": 0.12097599999970043,
              "p99": 0.15890600000011545,
              "p995": 0.169847000000118,
              "p999": 0.36589200000071287
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6724.291976043729,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1487145417781747,
              "min": 0.13721799999996165,
              "max": 0.43970899999999347,
              "p75": 0.15020299999991948,
              "p99": 0.24721400000009908,
              "p995": 0.2648179999999911,
              "p999": 0.34298499999999876
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.17133071377419,
            "unit": "ops/s",
            "extra": {
              "mean": 70.5650034,
              "min": 68.72202200000004,
              "max": 75.68394999999998,
              "p75": 70.13961500000005,
              "p99": 75.68394999999998,
              "p995": 75.68394999999998,
              "p999": 75.68394999999998
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1632.995250682141,
            "unit": "ops/s",
            "extra": {
              "mean": 0.6123716523867881,
              "min": 0.3457189999999173,
              "max": 2.516024000000016,
              "p75": 0.6467920000000049,
              "p99": 1.3156119999998737,
              "p995": 1.4355000000000473,
              "p999": 2.516024000000016
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 722.56583811981,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3839569313186768,
              "min": 0.9970299999999952,
              "max": 8.098942999999963,
              "p75": 1.5888649999999416,
              "p99": 3.6732499999998254,
              "p995": 5.204298999999992,
              "p999": 8.098942999999963
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 909885.9945407711,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0010990387872765427,
              "min": 0.0010219999999208085,
              "max": 0.29877699999997276,
              "p75": 0.0011019999999462016,
              "p99": 0.0011819999999715947,
              "p995": 0.0013420000000223808,
              "p999": 0.009998999999879743
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 498000.38149874384,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0020080305902386592,
              "min": 0.0017629999999826396,
              "max": 0.23953699999998435,
              "p75": 0.0018929999999954816,
              "p99": 0.003677000000038788,
              "p995": 0.003958000000011452,
              "p999": 0.014656999999999698
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1900012.7801792442,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005263122492816398,
              "min": 0.0004999999946448952,
              "max": 2.6671910000004573,
              "p75": 0.0005110000056447461,
              "p99": 0.0008010000019567087,
              "p995": 0.0008509999897796661,
              "p999": 0.0010420000035082921
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1402097.77008078,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007132170247602537,
              "min": 0.0006709999870508909,
              "max": 0.32838199999241624,
              "p75": 0.0006910000083735213,
              "p99": 0.0008119999984046444,
              "p995": 0.0009310000023106113,
              "p999": 0.0013820000021951273
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 291767.6207015995,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034273851142061214,
              "min": 0.003246000000217464,
              "max": 0.05044400000042515,
              "p75": 0.0034070000037900172,
              "p99": 0.0037070000034873374,
              "p995": 0.005470000003697351,
              "p999": 0.01257400000031339
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 292800.55532224843,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034152940690273855,
              "min": 0.0031860000017331913,
              "max": 0.1972479999967618,
              "p75": 0.0033660000044619665,
              "p99": 0.005178999999770895,
              "p995": 0.006492000000434928,
              "p999": 0.013774999999441206
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41374.871045255546,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024169259619110522,
              "min": 0.02292200000374578,
              "max": 2.502162999997381,
              "p75": 0.023644000000786036,
              "p99": 0.03972399998747278,
              "p995": 0.04371199999877717,
              "p999": 0.05352999999013264
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14184.411624036236,
            "unit": "ops/s",
            "extra": {
              "mean": 0.07049992812570717,
              "min": 0.06823699999949895,
              "max": 0.3914400000066962,
              "p75": 0.06947000000218395,
              "p99": 0.08519900000828784,
              "p995": 0.09292300000379328,
              "p999": 0.21769599999242928
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986311562017081,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3707201,
              "min": 999.9247649999998,
              "max": 1002.1575570000005,
              "p75": 1001.8050979999998,
              "p99": 1002.1575570000005,
              "p995": 1002.1575570000005,
              "p999": 1002.1575570000005
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328493505952213,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.3621783000017,
              "min": 3003.4174370000037,
              "max": 3004.687699000002,
              "p75": 3004.5159520000016,
              "p99": 3004.687699000002,
              "p995": 3004.687699000002,
              "p999": 3004.687699000002
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.214440683610617,
            "unit": "ops/s",
            "extra": {
              "mean": 97.90061257142848,
              "min": 94.4976370000004,
              "max": 99.55519099999947,
              "p75": 98.89541299999837,
              "p99": 99.55519099999947,
              "p995": 99.55519099999947,
              "p999": 99.55519099999947
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2586801.234306642,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038657782698485406,
              "min": 0.00029999999992469384,
              "max": 4.107359000000088,
              "p75": 0.0003510000000233049,
              "p99": 0.0007509999999797401,
              "p995": 0.0014029999999820575,
              "p999": 0.002143999999987045
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
        "date": 1751647791646,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 9178.615240675894,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10894889629629602,
              "min": 0.07722499999999854,
              "max": 1.1374649999999633,
              "p75": 0.124512999999979,
              "p99": 0.1599390000000085,
              "p995": 0.20019400000001042,
              "p999": 0.39180099999998674
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9648.497671021518,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10364307834197019,
              "min": 0.07586900000001151,
              "max": 0.3324079999999867,
              "p75": 0.10971100000006118,
              "p99": 0.14774999999985994,
              "p995": 0.15186799999992218,
              "p999": 0.2870350000000599
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 10138.753313993187,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09863145586349671,
              "min": 0.07434899999998379,
              "max": 2.6180790000000798,
              "p75": 0.10454500000014377,
              "p99": 0.1414429999999811,
              "p995": 0.1489080000001195,
              "p999": 0.27043400000002293
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10137.39812239939,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09864464115209406,
              "min": 0.07704400000011447,
              "max": 0.36721399999987625,
              "p75": 0.10577699999976176,
              "p99": 0.13176500000008673,
              "p995": 0.14018099999975675,
              "p999": 0.2689810000001671
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6664.689228910583,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1500445055505553,
              "min": 0.14011200000004465,
              "max": 0.3876640000000293,
              "p75": 0.1526049999999941,
              "p99": 0.2735209999999597,
              "p995": 0.3025650000000155,
              "p999": 0.3457459999999628
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.252502513895587,
            "unit": "ops/s",
            "extra": {
              "mean": 70.1631169,
              "min": 69.07978100000003,
              "max": 74.10650099999998,
              "p75": 70.46134500000005,
              "p99": 74.10650099999998,
              "p995": 74.10650099999998,
              "p999": 74.10650099999998
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1739.7937474512426,
            "unit": "ops/s",
            "extra": {
              "mean": 0.574780775862068,
              "min": 0.35870100000011007,
              "max": 1.2857020000001285,
              "p75": 0.6472590000003038,
              "p99": 1.1391380000000026,
              "p995": 1.2153699999998935,
              "p999": 1.2857020000001285
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 711.6436595992529,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4051976526610648,
              "min": 0.9366189999998369,
              "max": 5.0523809999999685,
              "p75": 1.6043569999999363,
              "p99": 2.982782000000043,
              "p995": 4.004210000000057,
              "p999": 5.0523809999999685
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 824800.3141079743,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001212414669217852,
              "min": 0.0010819999999966967,
              "max": 0.04190799999992123,
              "p75": 0.001222000000097978,
              "p99": 0.0013319999998202547,
              "p995": 0.00141299999995681,
              "p999": 0.009919000000081724
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 514910.1236675054,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019420865002175278,
              "min": 0.0017829999999889878,
              "max": 0.40687000000002627,
              "p75": 0.0019239999999172142,
              "p99": 0.0026249999999663487,
              "p995": 0.003727000000026237,
              "p999": 0.011170999999990272
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1949832.7092269082,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005128645115387829,
              "min": 0.0004899999912595376,
              "max": 0.4371849999879487,
              "p75": 0.0005010000022593886,
              "p99": 0.0005810000002384186,
              "p995": 0.000822000001790002,
              "p999": 0.001001999989966862
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1402217.018438246,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007131563708403531,
              "min": 0.0006709999870508909,
              "max": 3.0305669999943348,
              "p75": 0.0006819999980507419,
              "p99": 0.0009409999911440536,
              "p995": 0.0010009999969042838,
              "p999": 0.001472999996622093
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 289393.69555823033,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003455500293712463,
              "min": 0.0031959999978425913,
              "max": 0.19362099999852944,
              "p75": 0.0034159999995608814,
              "p99": 0.005270000001473818,
              "p995": 0.006452000001445413,
              "p999": 0.012933999998494983
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 293334.70404715464,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034090749788652564,
              "min": 0.0032260000007227063,
              "max": 0.18271999999706168,
              "p75": 0.003365999997186009,
              "p99": 0.005159000000276137,
              "p995": 0.006041000000550412,
              "p999": 0.013525000002118759
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42547.15016319065,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023503336796106795,
              "min": 0.022442000001319684,
              "max": 0.2111330000043381,
              "p75": 0.02336400000785943,
              "p99": 0.032460999995237216,
              "p995": 0.033692999990307726,
              "p999": 0.04378100000030827
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14903.044972775127,
            "unit": "ops/s",
            "extra": {
              "mean": 0.06710038128629413,
              "min": 0.0654519999952754,
              "max": 0.3188139999983832,
              "p75": 0.06620400000247173,
              "p99": 0.07899700000416487,
              "p995": 0.08790399999998044,
              "p999": 0.18715899999369867
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9987199953118645,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.2816452000001,
              "min": 999.8610129999997,
              "max": 1002.0971919999993,
              "p75": 1001.8469820000009,
              "p99": 1002.0971919999993,
              "p995": 1002.0971919999993,
              "p999": 1002.0971919999993
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33285476104885237,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.3133432999994,
              "min": 3003.3736539999954,
              "max": 3004.7039490000025,
              "p75": 3004.5693140000003,
              "p99": 3004.7039490000025,
              "p995": 3004.7039490000025,
              "p999": 3004.7039490000025
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.136095867762398,
            "unit": "ops/s",
            "extra": {
              "mean": 98.65731471428514,
              "min": 95.89075899999443,
              "max": 99.85556799999904,
              "p75": 99.14308000000165,
              "p99": 99.85556799999904,
              "p995": 99.85556799999904,
              "p999": 99.85556799999904
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2571751.855981702,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000388840003235178,
              "min": 0.00030999999989944627,
              "max": 4.0572610000000395,
              "p75": 0.0003510000000233049,
              "p99": 0.0007919999999330685,
              "p995": 0.001452000000085718,
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
          "id": "d250b51fd2351b1233dd3e28a18d3151a1fe822d",
          "message": "feat: Enhance Gemini output formatting issue plans with comprehensive requirements\n\n- Add specific regex patterns, buffer management, and error handling to Issue 16\n- Include comprehensive testing requirements with 90% coverage targets for Issue 17\n- Add performance optimization and extensive documentation specs to Issue 18\n- Resolve all identified gaps with measurable acceptance criteria\n- Provide concrete implementation guidance for developers\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-04T20:25:46+03:00",
          "tree_id": "a5e7ea4520f9ee959c43a9efb848412a10926abf",
          "url": "https://github.com/carlrannaberg/autoagent/commit/d250b51fd2351b1233dd3e28a18d3151a1fe822d"
        },
        "date": 1751650058720,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 9278.979701949958,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10777046961206868,
              "min": 0.07113299999991796,
              "max": 1.1127429999999663,
              "p75": 0.11682899999999563,
              "p99": 0.16500999999999522,
              "p995": 0.1907690000000457,
              "p999": 0.3994509999999991
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9841.79707119434,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10160745977245049,
              "min": 0.07575199999996585,
              "max": 0.3988800000000765,
              "p75": 0.10798300000010386,
              "p99": 0.14415099999996528,
              "p995": 0.14869899999996505,
              "p999": 0.3462409999999636
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 9926.81544561075,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1007372410093673,
              "min": 0.06957000000011249,
              "max": 2.517513999999892,
              "p75": 0.10658999999986918,
              "p99": 0.14586400000007416,
              "p995": 0.1501419999999598,
              "p999": 0.3668200000001889
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 8701.427707099838,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11492366927143009,
              "min": 0.07709499999964464,
              "max": 0.47560399999974834,
              "p75": 0.12760000000025684,
              "p99": 0.1548609999999826,
              "p995": 0.16463999999996304,
              "p999": 0.36289199999964694
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6815.342701088595,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14672776467136023,
              "min": 0.1374389999999721,
              "max": 0.5418790000000513,
              "p75": 0.14879900000005364,
              "p99": 0.24113400000004503,
              "p995": 0.3472830000000613,
              "p999": 0.459814999999935
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.015367811562342,
            "unit": "ops/s",
            "extra": {
              "mean": 71.35025020000003,
              "min": 70.01277600000003,
              "max": 74.51690400000007,
              "p75": 71.971902,
              "p99": 74.51690400000007,
              "p995": 74.51690400000007,
              "p999": 74.51690400000007
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1641.8378849272447,
            "unit": "ops/s",
            "extra": {
              "mean": 0.6090735322777092,
              "min": 0.3811969999997018,
              "max": 5.860609000000295,
              "p75": 0.6490610000000743,
              "p99": 1.379044000000249,
              "p995": 1.38312999999971,
              "p999": 5.860609000000295
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 665.5135787873184,
            "unit": "ops/s",
            "extra": {
              "mean": 1.5025989429429436,
              "min": 1.0035969999998997,
              "max": 4.853064000000131,
              "p75": 1.6108790000000681,
              "p99": 2.7604599999999664,
              "p995": 3.833043000000089,
              "p999": 4.853064000000131
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 866273.9774769883,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001154369201892093,
              "min": 0.0010619999998198182,
              "max": 0.046196999999892796,
              "p75": 0.0011419999998452113,
              "p99": 0.0021639999999933934,
              "p995": 0.0023650000000543514,
              "p999": 0.009718000000020766
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 502680.85589838715,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019893337656808276,
              "min": 0.0017929999999637403,
              "max": 0.2966679999999542,
              "p75": 0.0018939999999929569,
              "p99": 0.0036670000000071923,
              "p995": 0.0038879999999608117,
              "p999": 0.011690999999927953
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1880468.9845733314,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005317822352847233,
              "min": 0.0004999999946448952,
              "max": 2.802614000000176,
              "p75": 0.0005110000056447461,
              "p99": 0.0006010000070091337,
              "p995": 0.0008510000043315813,
              "p999": 0.0010529999999562278
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1392470.2705685012,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007181481868131604,
              "min": 0.0006709999870508909,
              "max": 3.1874380000081146,
              "p75": 0.0006819999980507419,
              "p99": 0.0009520000021439046,
              "p995": 0.001021999996737577,
              "p999": 0.0015730000013718382
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 287393.4729212963,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034795501436939505,
              "min": 0.0033059999987017363,
              "max": 0.034144999997806735,
              "p75": 0.0034670000022742897,
              "p99": 0.003767999995034188,
              "p995": 0.00518000000010943,
              "p999": 0.012363000001641922
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 294670.4635881673,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00339362142992928,
              "min": 0.0031860000017331913,
              "max": 0.17906699999730336,
              "p75": 0.003346999998029787,
              "p99": 0.004098000004887581,
              "p995": 0.005570999994233716,
              "p999": 0.013705000004847534
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 39695.623367916975,
            "unit": "ops/s",
            "extra": {
              "mean": 0.02519169407497517,
              "min": 0.023603999987244606,
              "max": 4.295303000006243,
              "p75": 0.024476000005961396,
              "p99": 0.039785000000847504,
              "p995": 0.052949000004446134,
              "p999": 0.06334999999671709
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14533.600362321298,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0688060752373874,
              "min": 0.06672600000456441,
              "max": 0.4624500000063563,
              "p75": 0.06784799999149982,
              "p99": 0.08075199999439064,
              "p995": 0.09016999999585096,
              "p999": 0.2872100000095088
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9984838579770609,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.5184442000002,
              "min": 1000.7952150000001,
              "max": 1002.1512219999986,
              "p75": 1001.8617250000007,
              "p99": 1002.1512219999986,
              "p995": 1002.1512219999986,
              "p999": 1002.1512219999986
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328544615775566,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.3160462999995,
              "min": 3003.5852709999963,
              "max": 3004.750490000006,
              "p75": 3004.573655,
              "p99": 3004.750490000006,
              "p995": 3004.750490000006,
              "p999": 3004.750490000006
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.155040985701879,
            "unit": "ops/s",
            "extra": {
              "mean": 98.47326085714303,
              "min": 96.88381200000003,
              "max": 99.732683000002,
              "p75": 99.26428199999646,
              "p99": 99.732683000002,
              "p995": 99.732683000002,
              "p999": 99.732683000002
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2526538.3476442383,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00039579846509450647,
              "min": 0.00030999999989944627,
              "max": 4.1769500000000335,
              "p75": 0.0003609999999980573,
              "p99": 0.0008010000000240325,
              "p995": 0.0014830000000074506,
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
          "id": "ee00036f23f3e0884f4be2a5027205b3f3d07ee5",
          "message": "fix: Improve stream formatter sentence boundary detection and resolve linting issues\n\n- Remove unused NUMBER_PATTERN constant to fix TypeScript error\n- Fix ESLint strict boolean expressions and curly brace requirements\n- Improve URL/email/file path regex patterns to exclude trailing punctuation\n- Enhance abbreviation detection with context-aware logic for better sentence splitting\n- Add special handling for titles followed by proper nouns (e.g., \"Dr. Smith\")\n- Update test expectations to match correct sentence boundary behavior\n- Achieve >95% accuracy on sentence boundary detection test suite\n- Add ESLint suppressions for legitimate console statements in tests\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-04T21:09:21+03:00",
          "tree_id": "4fe163fe209ba54733722e4fa559ca6be038128b",
          "url": "https://github.com/carlrannaberg/autoagent/commit/ee00036f23f3e0884f4be2a5027205b3f3d07ee5"
        },
        "date": 1751652685601,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 9370.45269462835,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10671843000426799,
              "min": 0.07583199999999124,
              "max": 1.1177800000000389,
              "p75": 0.12558500000000095,
              "p99": 0.1671720000000505,
              "p995": 0.20166700000004312,
              "p999": 0.4377979999999866
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10037.07512367554,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09963061825064867,
              "min": 0.07148400000005495,
              "max": 0.39666200000010576,
              "p75": 0.1094749999999749,
              "p99": 0.1453520000000026,
              "p995": 0.15868700000009994,
              "p999": 0.3434629999999288
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 9964.994165496031,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10035128805820255,
              "min": 0.07373799999959374,
              "max": 2.5903949999997167,
              "p75": 0.10600800000020172,
              "p99": 0.14373799999975745,
              "p995": 0.1504109999996217,
              "p999": 0.34674900000027264
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9429.832903360912,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10604641781548296,
              "min": 0.07643400000006295,
              "max": 0.43938200000002325,
              "p75": 0.12550499999997555,
              "p99": 0.1497220000001107,
              "p995": 0.15593499999977212,
              "p999": 0.34950400000025184
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6848.560994061071,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1460160756204375,
              "min": 0.13809900000001107,
              "max": 0.4117100000000278,
              "p75": 0.14882000000000062,
              "p99": 0.19878399999993235,
              "p995": 0.26842499999997926,
              "p999": 0.336371999999983
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.208896707148003,
            "unit": "ops/s",
            "extra": {
              "mean": 70.37844110000002,
              "min": 68.93437599999993,
              "max": 76.04635800000005,
              "p75": 70.28480000000002,
              "p99": 76.04635800000005,
              "p995": 76.04635800000005,
              "p999": 76.04635800000005
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1807.6921861745295,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5531915265486752,
              "min": 0.3634799999999814,
              "max": 5.608475999999882,
              "p75": 0.6328439999997499,
              "p99": 1.245918999999958,
              "p995": 1.3352719999998044,
              "p999": 5.608475999999882
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 710.9543469388761,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4065600756302492,
              "min": 1.0453650000001744,
              "max": 5.567841000000044,
              "p75": 1.6033889999998792,
              "p99": 3.8296150000001035,
              "p995": 5.502011999999922,
              "p999": 5.567841000000044
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 887251.5368547532,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011270760978841835,
              "min": 0.0010219999999208085,
              "max": 0.34791099999984,
              "p75": 0.0011319999998704589,
              "p99": 0.001213000000007014,
              "p995": 0.0018139999999675638,
              "p999": 0.009837999999945168
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 507191.1114011922,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019716433855422833,
              "min": 0.0017629999999826396,
              "max": 0.20467300000001387,
              "p75": 0.0019039999999677093,
              "p99": 0.003986999999938234,
              "p995": 0.0042680000000245855,
              "p999": 0.012904000000048654
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1939442.5454168364,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005156120774823335,
              "min": 0.0004899999912595376,
              "max": 0.44368899999244604,
              "p75": 0.0005010000022593886,
              "p99": 0.0007809999951859936,
              "p995": 0.000822000001790002,
              "p999": 0.0010119999933522195
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1407523.6650103398,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007104676282601997,
              "min": 0.0006709999870508909,
              "max": 0.2018370000005234,
              "p75": 0.0006819999980507419,
              "p99": 0.0008410000009462237,
              "p995": 0.0009520000021439046,
              "p999": 0.0014030000020284206
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 293812.67431649106,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034035291442969322,
              "min": 0.0032160000046133064,
              "max": 0.2739030000011553,
              "p75": 0.003386000003956724,
              "p99": 0.003656000000773929,
              "p995": 0.004447999999683816,
              "p999": 0.01253300000098534
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 289565.2563975814,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003453452988251364,
              "min": 0.0032260000007227063,
              "max": 0.20152699999744073,
              "p75": 0.0034070000037900172,
              "p99": 0.005159999993338715,
              "p995": 0.006011000004946254,
              "p999": 0.013826000002154615
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41990.90890808943,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023814678605524373,
              "min": 0.022511999995913357,
              "max": 2.1916000000055647,
              "p75": 0.023434000002453104,
              "p99": 0.03699900000356138,
              "p995": 0.040305000002263114,
              "p999": 0.049832999997306615
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14550.212335026356,
            "unit": "ops/s",
            "extra": {
              "mean": 0.06872751936359894,
              "min": 0.06694499999866821,
              "max": 0.3973930000065593,
              "p75": 0.06764600001042709,
              "p99": 0.08427800000936259,
              "p995": 0.09652099999948405,
              "p999": 0.20628500000748318
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9987628752733263,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.2386571,
              "min": 999.797359000001,
              "max": 1002.0434249999998,
              "p75": 1001.777571999999,
              "p99": 1002.0434249999998,
              "p995": 1002.0434249999998,
              "p999": 1002.0434249999998
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328562820788621,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.2996147000003,
              "min": 3003.578462999998,
              "max": 3004.8310340000025,
              "p75": 3004.570427999999,
              "p99": 3004.8310340000025,
              "p995": 3004.8310340000025,
              "p999": 3004.8310340000025
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.165232671976563,
            "unit": "ops/s",
            "extra": {
              "mean": 98.37453133333509,
              "min": 93.13360699999612,
              "max": 99.76955300000554,
              "p75": 99.33068300000014,
              "p99": 99.76955300000554,
              "p995": 99.76955300000554,
              "p999": 99.76955300000554
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2571990.8991882303,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038880386408661835,
              "min": 0.00031999999998788553,
              "max": 1.1885019999999713,
              "p75": 0.0003609999999980573,
              "p99": 0.0006809999999859428,
              "p995": 0.0008710000000746732,
              "p999": 0.0020949999999970714
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
        "date": 1751653620222,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 8737.432923128372,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11445009178301739,
              "min": 0.07625300000006519,
              "max": 1.6904669999999555,
              "p75": 0.12573399999996582,
              "p99": 0.1698549999999841,
              "p995": 0.23547999999993863,
              "p999": 0.8937990000000013
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 8390.439965497191,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11918326143946649,
              "min": 0.0727959999999257,
              "max": 1.3228810000000522,
              "p75": 0.12255899999991016,
              "p99": 0.47490700000003017,
              "p995": 0.7014299999998457,
              "p999": 0.9712449999999535
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 9873.438379871055,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10128183936800543,
              "min": 0.07228499999973792,
              "max": 2.6321170000001075,
              "p75": 0.10692999999992026,
              "p99": 0.14365799999995943,
              "p995": 0.15033100000027844,
              "p999": 0.29150499999968815
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9811.204017018496,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10192428964532813,
              "min": 0.07334699999955774,
              "max": 0.4376580000002832,
              "p75": 0.11039600000003702,
              "p99": 0.15100200000006225,
              "p995": 0.1549790000003668,
              "p999": 0.2724990000001526
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6780.477009936887,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14748224918902986,
              "min": 0.13861899999994876,
              "max": 0.41943300000002637,
              "p75": 0.1509919999999738,
              "p99": 0.19269100000002481,
              "p995": 0.27309999999999945,
              "p999": 0.3592209999999909
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.229555474862584,
            "unit": "ops/s",
            "extra": {
              "mean": 70.27626420000004,
              "min": 68.575603,
              "max": 75.68380200000001,
              "p75": 70.77020300000004,
              "p99": 75.68380200000001,
              "p995": 75.68380200000001,
              "p999": 75.68380200000001
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1741.3803124020324,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5742570952927657,
              "min": 0.3435000000004038,
              "max": 1.474500000000262,
              "p75": 0.6332509999997455,
              "p99": 1.3191090000000258,
              "p995": 1.3716870000002928,
              "p999": 1.474500000000262
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 755.9388128006133,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3228583888888907,
              "min": 0.8952389999999468,
              "max": 5.177353000000039,
              "p75": 1.5821399999999812,
              "p99": 2.501207000000022,
              "p995": 4.563126999999895,
              "p999": 5.177353000000039
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 845504.4408898341,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001182725899047402,
              "min": 0.0010609999999360298,
              "max": 0.28090399999996407,
              "p75": 0.0011629999999058782,
              "p99": 0.002054000000043743,
              "p995": 0.0022839999999177962,
              "p999": 0.00973799999997027
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 490626.5654079191,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0020382100573143143,
              "min": 0.0017829999999321444,
              "max": 0.2196519999999964,
              "p75": 0.0018939999999929569,
              "p99": 0.004078000000049542,
              "p995": 0.004277999999999338,
              "p999": 0.01139100000000326
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1925120.9219380259,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005194478895348021,
              "min": 0.0004999999946448952,
              "max": 0.4171409999980824,
              "p75": 0.0005110000056447461,
              "p99": 0.0005810000002384186,
              "p995": 0.0008410000009462237,
              "p999": 0.000981999997748062
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1416219.7507476714,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007061051079622816,
              "min": 0.0006609999982174486,
              "max": 0.28120700000727084,
              "p75": 0.0006819999980507419,
              "p99": 0.0008110000053420663,
              "p995": 0.0008910000033210963,
              "p999": 0.001352999999653548
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 285244.1778613266,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0035057683122498534,
              "min": 0.0033059999987017363,
              "max": 0.02958599999692524,
              "p75": 0.0034959999975399114,
              "p99": 0.00375700000586221,
              "p995": 0.006081999999878462,
              "p999": 0.012404000000969972
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 285993.70085025043,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003496580508686139,
              "min": 0.0032550000032642856,
              "max": 0.19342199999664444,
              "p75": 0.0034559999985503964,
              "p99": 0.005219000006036367,
              "p995": 0.006663000000116881,
              "p999": 0.013404999997874256
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 39977.859997424646,
            "unit": "ops/s",
            "extra": {
              "mean": 0.025013845164909267,
              "min": 0.023293999998713844,
              "max": 3.6898650000075577,
              "p75": 0.024256000004243106,
              "p99": 0.0418189999909373,
              "p995": 0.055586000002222136,
              "p999": 0.06770800000231247
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14930.746729748953,
            "unit": "ops/s",
            "extra": {
              "mean": 0.06697588661172167,
              "min": 0.06530400000337977,
              "max": 0.3504419999953825,
              "p75": 0.06602500000735745,
              "p99": 0.07843800001137424,
              "p995": 0.0919339999963995,
              "p999": 0.1975629999942612
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9985380325780521,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.4641078999999,
              "min": 999.9562680000008,
              "max": 1002.1864740000001,
              "p75": 1001.8475609999987,
              "p99": 1002.1864740000001,
              "p995": 1002.1864740000001,
              "p999": 1002.1864740000001
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328507348059521,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.3496841999995,
              "min": 3003.422155,
              "max": 3005.349568999998,
              "p75": 3004.496665999999,
              "p99": 3005.349568999998,
              "p995": 3005.349568999998,
              "p999": 3005.349568999998
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.10024965277654,
            "unit": "ops/s",
            "extra": {
              "mean": 99.00745371428535,
              "min": 97.31555600000138,
              "max": 100.01707100000203,
              "p75": 99.72724500000186,
              "p99": 100.01707100000203,
              "p995": 100.01707100000203,
              "p999": 100.01707100000203
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2490029.0189286782,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00040160174536047963,
              "min": 0.00033999999982370355,
              "max": 1.1585640000000126,
              "p75": 0.0003809999999475622,
              "p99": 0.0007209999999986394,
              "p995": 0.0008820000000469008,
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
        "date": 1751657916785,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 9687.829164820521,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10322229913294782,
              "min": 0.07335599999998976,
              "max": 1.1069009999999935,
              "p75": 0.10758999999995922,
              "p99": 0.16770199999996294,
              "p995": 0.18645700000001852,
              "p999": 0.429520000000025
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10639.719132694407,
            "unit": "ops/s",
            "extra": {
              "mean": 0.093987443421052,
              "min": 0.07596200000011777,
              "max": 0.34016300000007504,
              "p75": 0.0988039999999728,
              "p99": 0.12255800000002637,
              "p995": 0.12934100000006765,
              "p999": 0.29007000000001426
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 9692.44478698811,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10317314382254493,
              "min": 0.07464899999968111,
              "max": 2.7332769999998163,
              "p75": 0.10788100000036138,
              "p99": 0.14321700000004967,
              "p995": 0.14823599999999715,
              "p999": 0.3484290000001238
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9572.979175792867,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10446068894923471,
              "min": 0.07510000000002037,
              "max": 0.38119000000006054,
              "p75": 0.10943399999996473,
              "p99": 0.14412799999990966,
              "p995": 0.15079100000002654,
              "p999": 0.29007000000001426
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6748.325875316835,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14818490074074112,
              "min": 0.13868800000000192,
              "max": 0.46043800000001056,
              "p75": 0.15092100000003938,
              "p99": 0.24994499999996833,
              "p995": 0.27798699999993914,
              "p999": 0.39984400000003006
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.125287962181421,
            "unit": "ops/s",
            "extra": {
              "mean": 70.79501689999998,
              "min": 68.79666499999996,
              "max": 76.14844200000005,
              "p75": 70.43985999999995,
              "p99": 76.14844200000005,
              "p995": 76.14844200000005,
              "p999": 76.14844200000005
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1924.5675866857255,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5195972367601223,
              "min": 0.34328899999991336,
              "max": 4.001107999999931,
              "p75": 0.5932949999996708,
              "p99": 1.1288009999998394,
              "p995": 1.5588520000001154,
              "p999": 4.001107999999931
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 662.1636916233726,
            "unit": "ops/s",
            "extra": {
              "mean": 1.510200593373493,
              "min": 0.950448999999935,
              "max": 4.723613000000114,
              "p75": 1.6228309999999055,
              "p99": 2.5420420000000377,
              "p995": 2.766740000000027,
              "p999": 4.723613000000114
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 905775.6177625525,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001104026185282179,
              "min": 0.0010209999998096464,
              "max": 2.8088689999999588,
              "p75": 0.0010819999999966967,
              "p99": 0.0012520000000222353,
              "p995": 0.0020940000001701264,
              "p999": 0.009808000000020911
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 529820.9848630021,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0018874299594957985,
              "min": 0.0017629999999826396,
              "max": 0.1612500000000523,
              "p75": 0.0018729999999891334,
              "p99": 0.0019839999999931024,
              "p995": 0.002534999999966203,
              "p999": 0.011361000000022159
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1940097.1152867319,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005154381149895207,
              "min": 0.0004899999912595376,
              "max": 2.494732999999542,
              "p75": 0.0005010000022593886,
              "p99": 0.0006310000026132911,
              "p995": 0.0008209999941755086,
              "p999": 0.0009520000021439046
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1413993.6210536142,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000707216768951805,
              "min": 0.0006609999982174486,
              "max": 0.32164899999042973,
              "p75": 0.0006819999980507419,
              "p99": 0.0008320000051753595,
              "p995": 0.000941999998758547,
              "p999": 0.001352999999653548
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 290779.7760998859,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034390287158639586,
              "min": 0.0032159999973373488,
              "max": 0.21894700000120793,
              "p75": 0.0034159999995608814,
              "p99": 0.0050389999960316345,
              "p995": 0.006300999993982259,
              "p999": 0.012804000005417038
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 291119.91732107673,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034350105935798893,
              "min": 0.0032259999934467487,
              "max": 0.16265199999907054,
              "p75": 0.003396000000066124,
              "p99": 0.004198000002361368,
              "p995": 0.005831000002217479,
              "p999": 0.013524999994842801
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41265.17321104231,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024233510299004536,
              "min": 0.022442000001319684,
              "max": 3.823605999990832,
              "p75": 0.02361400000518188,
              "p99": 0.0398540000023786,
              "p995": 0.04659699999319855,
              "p999": 0.06314800000109244
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14579.546357410876,
            "unit": "ops/s",
            "extra": {
              "mean": 0.06858923971195398,
              "min": 0.06691500000306405,
              "max": 0.42031700001098216,
              "p75": 0.06765500000619795,
              "p99": 0.07991800000309013,
              "p995": 0.09358500000962522,
              "p999": 0.2045710000093095
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986104363738947,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3914972000002,
              "min": 1000.1860850000012,
              "max": 1002.0587529999993,
              "p75": 1001.8113919999996,
              "p99": 1002.0587529999993,
              "p995": 1002.0587529999993,
              "p999": 1002.0587529999993
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33286092349669505,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.2577227,
              "min": 3003.484217999998,
              "max": 3004.470551000006,
              "p75": 3004.4167219999945,
              "p99": 3004.470551000006,
              "p995": 3004.470551000006,
              "p999": 3004.470551000006
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.137562004853196,
            "unit": "ops/s",
            "extra": {
              "mean": 98.64304647619082,
              "min": 96.43667599999753,
              "max": 99.72443400000338,
              "p75": 99.34077299999626,
              "p99": 99.72443400000338,
              "p995": 99.72443400000338,
              "p999": 99.72443400000338
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2628775.9316518824,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038040518705282554,
              "min": 0.00030999999989944627,
              "max": 4.157506999999896,
              "p75": 0.00034999999996898623,
              "p99": 0.0007620000000088112,
              "p995": 0.0012929999999187203,
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
          "id": "8eda2d9ed70c7f301bb36f652a6cc55726668752",
          "message": "fix: Improve issue consistency and documentation clarity\n\n- Update AGENT.md to clarify CHANGELOG.md should only contain package functionality changes\n- Remove issue numbers from CHANGELOG.md guidance (they are ephemeral)\n- Fix Issue 37 title duplication: \"Add Bootstrap TODO Integration Tests\"\n- Remove unnecessary backward compatibility from Issue 35 (internal refactoring)\n- Add specific generateFileSlug method signature to Issue 26\n- Complete Issue 20's generated issues list to match Issues 19 and 21\n- Update TODO.md with corrected Issue 37 title\n\nThese changes improve consistency across bootstrap-related issues and provide clearer guidance for future development.\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-04T23:20:28+03:00",
          "tree_id": "e57b49d944446d2ecc3010ddbfc18ccd4bb0c4e2",
          "url": "https://github.com/carlrannaberg/autoagent/commit/8eda2d9ed70c7f301bb36f652a6cc55726668752"
        },
        "date": 1751660545729,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 8486.605124608426,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11783274764373348,
              "min": 0.07780500000001211,
              "max": 1.571679999999958,
              "p75": 0.13124599999991915,
              "p99": 0.17271299999998746,
              "p995": 0.19767899999999372,
              "p999": 0.43073600000002443
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 11359.440320375303,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0880325061619727,
              "min": 0.07276600000000144,
              "max": 0.40734199999997145,
              "p75": 0.09067900000013651,
              "p99": 0.13404100000002472,
              "p995": 0.14806799999996656,
              "p999": 0.33428600000002007
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 10149.452855791485,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09852747869353169,
              "min": 0.0759530000000268,
              "max": 2.9499289999998837,
              "p75": 0.10488699999996243,
              "p99": 0.13880900000003749,
              "p995": 0.14958000000001448,
              "p999": 0.3328329999999369
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9782.99546246013,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10221818090760208,
              "min": 0.07713400000011461,
              "max": 0.8378780000002735,
              "p75": 0.11030600000003687,
              "p99": 0.15641299999970215,
              "p995": 0.19212000000015905,
              "p999": 0.32940599999983533
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6714.012665678946,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14894222721858333,
              "min": 0.13874900000007528,
              "max": 0.42728900000003023,
              "p75": 0.151945000000012,
              "p99": 0.26114899999993213,
              "p995": 0.29786699999999655,
              "p999": 0.3725170000000162
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.207362750361751,
            "unit": "ops/s",
            "extra": {
              "mean": 70.38603980000002,
              "min": 69.4630380000001,
              "max": 72.06934799999999,
              "p75": 70.30938300000003,
              "p99": 72.06934799999999,
              "p995": 72.06934799999999,
              "p999": 72.06934799999999
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1764.4211536056523,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5667581109852754,
              "min": 0.33927500000027067,
              "max": 5.761427999999796,
              "p75": 0.6345670000000609,
              "p99": 1.2643359999997301,
              "p995": 1.3048420000000078,
              "p999": 5.761427999999796
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 731.6218276037981,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3668263606557391,
              "min": 1.034825999999839,
              "max": 3.946473999999853,
              "p75": 1.5845650000001115,
              "p99": 2.6743340000000444,
              "p995": 2.995625000000018,
              "p999": 3.946473999999853
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 868710.7942296043,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001151131086021357,
              "min": 0.0010709999999107822,
              "max": 0.2760769999999866,
              "p75": 0.0011520000000473374,
              "p99": 0.001242000000047483,
              "p995": 0.0015530000000580912,
              "p999": 0.009808000000020911
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 507547.5157996665,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019702588799483138,
              "min": 0.001774000000068554,
              "max": 0.28501300000004903,
              "p75": 0.0018929999999954816,
              "p99": 0.003958000000011452,
              "p995": 0.004207000000008065,
              "p999": 0.011851999999976215
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1910400.2577174332,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005234505156499564,
              "min": 0.0004999999946448952,
              "max": 0.37533199999597855,
              "p75": 0.0005110000056447461,
              "p99": 0.0005920000112382695,
              "p995": 0.0008419999940088019,
              "p999": 0.001001999989966862
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1412511.064930493,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007079590559166403,
              "min": 0.0006609999982174486,
              "max": 0.3974539999908302,
              "p75": 0.0006819999980507419,
              "p99": 0.0009219999919878319,
              "p995": 0.0009920000011334196,
              "p999": 0.001452999989851378
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 290873.8167500895,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034379168643397405,
              "min": 0.0032659999997122213,
              "max": 0.15175399999861838,
              "p75": 0.0034069999965140596,
              "p99": 0.00414699999964796,
              "p995": 0.0058510000017122366,
              "p999": 0.01294400000188034
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 293311.56472568266,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003409343920466423,
              "min": 0.003214999996998813,
              "max": 0.22481100000004517,
              "p75": 0.0033470000053057447,
              "p99": 0.00518000000010943,
              "p995": 0.006161999997857492,
              "p999": 0.014566999998351093
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41469.27586342327,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024114238292789195,
              "min": 0.022833000009995885,
              "max": 0.5079400000104215,
              "p75": 0.02347400000144262,
              "p99": 0.04093599999032449,
              "p995": 0.05086499999742955,
              "p999": 0.0672960000083549
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14711.735880213842,
            "unit": "ops/s",
            "extra": {
              "mean": 0.06797294405923392,
              "min": 0.0661439999967115,
              "max": 0.40561800000432413,
              "p75": 0.06704599999648053,
              "p99": 0.07897800000500865,
              "p995": 0.09048900000925642,
              "p999": 0.22589200000220444
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9983873881174822,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.6152165999998,
              "min": 1000.9744550000005,
              "max": 1002.0267839999997,
              "p75": 1001.8127499999991,
              "p99": 1002.0267839999997,
              "p995": 1002.0267839999997,
              "p999": 1002.0267839999997
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328320836333932,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.518041299999,
              "min": 3003.5967600000004,
              "max": 3005.0579769999968,
              "p75": 3004.7648689999987,
              "p99": 3005.0579769999968,
              "p995": 3005.0579769999968,
              "p999": 3005.0579769999968
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.171439856108341,
            "unit": "ops/s",
            "extra": {
              "mean": 98.31449766666628,
              "min": 93.90090899999632,
              "max": 99.63324100000318,
              "p75": 99.264900999995,
              "p99": 99.63324100000318,
              "p995": 99.63324100000318,
              "p999": 99.63324100000318
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2568672.674565116,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000389306122925648,
              "min": 0.00030999999989944627,
              "max": 1.1980719999999678,
              "p75": 0.0003600000000005821,
              "p99": 0.0008119999999962602,
              "p995": 0.001442999999994754,
              "p999": 0.002375000000029104
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
        "date": 1751662654115,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 8617.436626463124,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11604378927825461,
              "min": 0.07963900000004287,
              "max": 1.5665729999999485,
              "p75": 0.12987299999997504,
              "p99": 0.16541999999998325,
              "p995": 0.19025400000003856,
              "p999": 0.3787590000000023
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10016.544896522613,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09983482431623346,
              "min": 0.07543099999998049,
              "max": 0.35722899999996116,
              "p75": 0.10833299999990231,
              "p99": 0.14631400000007488,
              "p995": 0.15195500000004358,
              "p999": 0.2890709999999217
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 9600.968086382058,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10415616331632147,
              "min": 0.07643299999972442,
              "max": 2.5838670000000548,
              "p75": 0.11303199999974822,
              "p99": 0.14832699999988108,
              "p995": 0.15326699999991433,
              "p999": 0.29595400000016525
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10504.04855785902,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09520138777841144,
              "min": 0.07594199999994089,
              "max": 0.337481999999909,
              "p75": 0.10300299999971685,
              "p99": 0.13583599999947182,
              "p995": 0.14465100000006714,
              "p999": 0.28702700000030745
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6802.239716406225,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1470104027042908,
              "min": 0.13899000000003525,
              "max": 0.4388820000000351,
              "p75": 0.14967000000001462,
              "p99": 0.2068979999999101,
              "p995": 0.27952400000003763,
              "p999": 0.3780280000000289
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.344345445254907,
            "unit": "ops/s",
            "extra": {
              "mean": 69.71388160000001,
              "min": 68.58699000000001,
              "max": 73.40076900000008,
              "p75": 70.03232500000001,
              "p99": 73.40076900000008,
              "p995": 73.40076900000008,
              "p999": 73.40076900000008
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1816.1298003832233,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5506214367436673,
              "min": 0.3430119999998169,
              "max": 3.965092999999797,
              "p75": 0.6283759999996619,
              "p99": 1.1871220000002722,
              "p995": 1.4401449999995748,
              "p999": 3.965092999999797
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 665.0313034328589,
            "unit": "ops/s",
            "extra": {
              "mean": 1.5036886156156097,
              "min": 1.0262720000000627,
              "max": 5.271477000000004,
              "p75": 1.594586000000163,
              "p99": 3.530479000000014,
              "p995": 4.620560000000069,
              "p999": 5.271477000000004
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 855113.9965796972,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011694347233232303,
              "min": 0.0010720000000219443,
              "max": 0.28587500000003274,
              "p75": 0.0011719999999968422,
              "p99": 0.0012520000000222353,
              "p995": 0.0012830000000576547,
              "p999": 0.009888999999930093
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 527846.4502428345,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0018944903381275982,
              "min": 0.0017529999999510437,
              "max": 0.23258700000002364,
              "p75": 0.0018640000000686996,
              "p99": 0.003085999999939304,
              "p995": 0.003757000000007338,
              "p999": 0.011301000000003114
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1899561.0121922253,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005264374208470043,
              "min": 0.0004999999946448952,
              "max": 2.535495999996783,
              "p75": 0.0005110000056447461,
              "p99": 0.0006009999924572185,
              "p995": 0.0008420000085607171,
              "p999": 0.001021999996737577
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1406545.0266651902,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007109619536111992,
              "min": 0.0006709999870508909,
              "max": 0.5508910000062315,
              "p75": 0.0006819999980507419,
              "p99": 0.0009220000065397471,
              "p995": 0.001001000011456199,
              "p999": 0.0014430000010179356
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 289120.33293117525,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003458767461498631,
              "min": 0.0032860000064829364,
              "max": 0.029144000000087544,
              "p75": 0.003445999995165039,
              "p99": 0.0036369999943417497,
              "p995": 0.0058910000007017516,
              "p999": 0.01249400000233436
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 291667.8139152987,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034285579425997383,
              "min": 0.0032260000007227063,
              "max": 0.18551700000534765,
              "p75": 0.003396000000066124,
              "p99": 0.004186999998637475,
              "p995": 0.005750999996962491,
              "p999": 0.013906000000133645
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41934.34250311566,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023846802890153854,
              "min": 0.02277299998968374,
              "max": 2.3034809999953723,
              "p75": 0.023453999994671904,
              "p99": 0.03512600000249222,
              "p995": 0.040074999997159466,
              "p999": 0.04783899999165442
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14739.690333833603,
            "unit": "ops/s",
            "extra": {
              "mean": 0.06784403046138575,
              "min": 0.0661439999967115,
              "max": 0.2831799999985378,
              "p75": 0.06689600000390783,
              "p99": 0.08253500000864733,
              "p995": 0.09719200000108685,
              "p999": 0.19095699999888893
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9985487664397006,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.4533427000002,
              "min": 1000.0995190000012,
              "max": 1004.3746140000003,
              "p75": 1001.7406740000006,
              "p99": 1004.3746140000003,
              "p995": 1004.3746140000003,
              "p999": 1004.3746140000003
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33283609895638716,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.4817949,
              "min": 3002.5535969999983,
              "max": 3005.319838999996,
              "p75": 3004.6737859999994,
              "p99": 3005.319838999996,
              "p995": 3005.319838999996,
              "p999": 3005.319838999996
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.161645475368,
            "unit": "ops/s",
            "extra": {
              "mean": 98.40925885714248,
              "min": 96.0953939999963,
              "max": 99.73068500000227,
              "p75": 98.99262599999929,
              "p99": 99.73068500000227,
              "p995": 99.73068500000227,
              "p999": 99.73068500000227
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2618445.439652918,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038190599080519807,
              "min": 0.00031999999998788553,
              "max": 1.2925400000000309,
              "p75": 0.0003600000000005821,
              "p99": 0.0007009999999922911,
              "p995": 0.000881999999933214,
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
          "id": "5333534d303872748f7d7e3b837dc32be2d6faba",
          "message": "improve: Update release script timeout handling\n\n- Set timeout to 10 minutes instead of 30\n- Check for gtimeout (macOS) before timeout (Linux)\n- Add exec to npm scripts to avoid npm timeout issues\n- Update timeout message to reflect actual duration\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-04T23:58:50+03:00",
          "tree_id": "3d16e0464956892b909c31d12c52577727a63de1",
          "url": "https://github.com/carlrannaberg/autoagent/commit/5333534d303872748f7d7e3b837dc32be2d6faba"
        },
        "date": 1751662885869,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 9267.196571126091,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10790749848942573,
              "min": 0.0811710000000403,
              "max": 0.6801720000000273,
              "p75": 0.1204450000000179,
              "p99": 0.1659410000000321,
              "p995": 0.18469499999997652,
              "p999": 0.335015999999996
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9497.854302914939,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1052869383028012,
              "min": 0.07633299999997689,
              "max": 0.328363999999965,
              "p75": 0.12421300000005431,
              "p99": 0.14660399999991114,
              "p995": 0.15014100000007602,
              "p999": 0.2663079999999809
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 10128.571769049806,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0987306031691192,
              "min": 0.07364799999982097,
              "max": 2.556514999999763,
              "p75": 0.10562800000025163,
              "p99": 0.13926999999966938,
              "p995": 0.1493489999998019,
              "p999": 0.27419300000019575
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9753.470971734461,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10252760303465278,
              "min": 0.07684400000016467,
              "max": 0.3105909999999312,
              "p75": 0.11100799999985611,
              "p99": 0.14406999999982872,
              "p995": 0.14855800000032104,
              "p999": 0.2822990000004211
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6813.979396177861,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14675712118544504,
              "min": 0.13865999999995893,
              "max": 0.40698100000003024,
              "p75": 0.1503219999999601,
              "p99": 0.1961070000000973,
              "p995": 0.2634930000000395,
              "p999": 0.3467889999999443
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.342748882313325,
            "unit": "ops/s",
            "extra": {
              "mean": 69.7216418,
              "min": 68.83932000000004,
              "max": 70.47983799999997,
              "p75": 70.02270299999998,
              "p99": 70.47983799999997,
              "p995": 70.47983799999997,
              "p999": 70.47983799999997
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1821.7112223370268,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5489344237102111,
              "min": 0.3684800000000905,
              "max": 6.761949000000186,
              "p75": 0.6323330000000169,
              "p99": 1.2088290000001507,
              "p995": 1.3678789999999026,
              "p999": 6.761949000000186
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 760.9380941489773,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3141673517060364,
              "min": 0.942984000000024,
              "max": 5.4111820000000534,
              "p75": 1.5679829999999129,
              "p99": 2.5638060000001133,
              "p995": 4.862256000000116,
              "p999": 5.4111820000000534
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 683037.1871857488,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0014640491305022527,
              "min": 0.001191999999946347,
              "max": 0.26421400000003814,
              "p75": 0.0014730000000326982,
              "p99": 0.0016029999999318534,
              "p995": 0.002173999999968146,
              "p999": 0.009979000000157612
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 408671.54719192564,
            "unit": "ops/s",
            "extra": {
              "mean": 0.002446952832589461,
              "min": 0.0019239999999172142,
              "max": 1.1801779999999553,
              "p75": 0.0023540000000252803,
              "p99": 0.004267999999967742,
              "p995": 0.004537999999968179,
              "p999": 0.01324499999998352
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1914964.7246041086,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005222028307632328,
              "min": 0.0004999999946448952,
              "max": 0.4528169999975944,
              "p75": 0.0005110000056447461,
              "p99": 0.0006319999956758693,
              "p995": 0.0008410000009462237,
              "p999": 0.001021999996737577
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1412340.697818908,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007080444552396672,
              "min": 0.0006709999870508909,
              "max": 0.29075400000147056,
              "p75": 0.0006819999980507419,
              "p99": 0.0008210000087274238,
              "p995": 0.0009319999953731894,
              "p999": 0.001452999989851378
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 292649.7067673134,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003417054508771822,
              "min": 0.0032349999964935705,
              "max": 0.04271599999628961,
              "p75": 0.003396000000066124,
              "p99": 0.004207999998470768,
              "p995": 0.005649999999150168,
              "p999": 0.01272400000016205
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 291870.7437881568,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034261741585371493,
              "min": 0.0032260000007227063,
              "max": 0.13005300000077114,
              "p75": 0.003386000003956724,
              "p99": 0.004537999993772246,
              "p995": 0.006412000002455898,
              "p999": 0.013455000000249129
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41581.82277840798,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024048969794543636,
              "min": 0.022963000010349788,
              "max": 2.2832350000098813,
              "p75": 0.02370399999199435,
              "p99": 0.033953999998630024,
              "p995": 0.039925000004586764,
              "p999": 0.04504399999859743
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14950.08951538407,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0668892315976417,
              "min": 0.06527199999254663,
              "max": 0.3127550000062911,
              "p75": 0.06598400000075344,
              "p99": 0.07930800000031013,
              "p995": 0.08790399999998044,
              "p999": 0.18990499999199528
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9985986148363919,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.4033518,
              "min": 1000.0146970000005,
              "max": 1002.0459109999993,
              "p75": 1001.7945720000007,
              "p99": 1002.0459109999993,
              "p995": 1002.0459109999993,
              "p999": 1002.0459109999993
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33286905215079526,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.1843587999983,
              "min": 3003.268523999999,
              "max": 3005.3164879999968,
              "p75": 3004.571925999997,
              "p99": 3005.3164879999968,
              "p995": 3005.3164879999968,
              "p999": 3005.3164879999968
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.213764306030054,
            "unit": "ops/s",
            "extra": {
              "mean": 97.90709576190386,
              "min": 94.16711700000451,
              "max": 99.78987400000187,
              "p75": 98.88298799999757,
              "p99": 99.78987400000187,
              "p995": 99.78987400000187,
              "p999": 99.78987400000187
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2568881.5324633913,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003892744711512892,
              "min": 0.00030999999989944627,
              "max": 3.907760000000053,
              "p75": 0.0003609999999980573,
              "p99": 0.0007109999999102001,
              "p995": 0.0014130000000704968,
              "p999": 0.002195000000028813
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
        "date": 1751664856535,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 9361.13330883373,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10682467250587487,
              "min": 0.07641300000000228,
              "max": 2.3233619999999746,
              "p75": 0.11281100000007882,
              "p99": 0.16489799999999377,
              "p995": 0.18888399999997318,
              "p999": 0.37418099999996457
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9688.34902781872,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1032167603715186,
              "min": 0.07792599999993399,
              "max": 0.34994300000005296,
              "p75": 0.1094550000000254,
              "p99": 0.1502020000000357,
              "p995": 0.17745799999988776,
              "p999": 0.29270900000005895
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 9772.380718321103,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10232921013046657,
              "min": 0.07552099999975326,
              "max": 3.001525000000129,
              "p75": 0.10861300000010488,
              "p99": 0.14804800000001705,
              "p995": 0.15321700000004057,
              "p999": 0.3103020000003198
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9631.553172984952,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10382541445182991,
              "min": 0.07481999999981781,
              "max": 0.3292870000000221,
              "p75": 0.12147800000002462,
              "p99": 0.1475060000002486,
              "p995": 0.15360799999962182,
              "p999": 0.2674409999999625
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6875.533577553164,
            "unit": "ops/s",
            "extra": {
              "mean": 0.145443257417103,
              "min": 0.13720699999998942,
              "max": 0.3788699999999494,
              "p75": 0.14650499999993372,
              "p99": 0.25467700000001514,
              "p995": 0.298909999999978,
              "p999": 0.34301299999992807
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.27609385040711,
            "unit": "ops/s",
            "extra": {
              "mean": 70.04717190000002,
              "min": 68.74514899999986,
              "max": 75.75548099999992,
              "p75": 70.04459699999995,
              "p99": 75.75548099999992,
              "p995": 75.75548099999992,
              "p999": 75.75548099999992
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1825.6349314340528,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5477546374589201,
              "min": 0.35589699999991353,
              "max": 3.685997000000043,
              "p75": 0.6313130000003184,
              "p99": 1.1530680000000757,
              "p995": 1.2817419999996673,
              "p999": 3.685997000000043
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 691.5884854866581,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4459465722543348,
              "min": 1.015683000000081,
              "max": 4.976024000000052,
              "p75": 1.6032940000000053,
              "p99": 2.4166680000000724,
              "p995": 3.125056000000086,
              "p999": 4.976024000000052
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 889323.0502029168,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011244507828418817,
              "min": 0.0010419999998703133,
              "max": 0.2647260000001097,
              "p75": 0.00112200000012308,
              "p99": 0.0011930000000575092,
              "p995": 0.0012320000000727305,
              "p999": 0.00994900000000598
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 509961.64710654144,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019609317792306045,
              "min": 0.0017429999999194479,
              "max": 0.27954399999998714,
              "p75": 0.0018730000000459768,
              "p99": 0.004137000000014268,
              "p995": 0.004358000000024731,
              "p999": 0.011260999999990418
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1907604.9317470393,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005242175585508532,
              "min": 0.0004999999946448952,
              "max": 2.942399999999907,
              "p75": 0.0005110000056447461,
              "p99": 0.0005810000002384186,
              "p995": 0.0008410000009462237,
              "p999": 0.000981999997748062
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1415757.7848161985,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007063355121369334,
              "min": 0.0006609999982174486,
              "max": 0.3085480000008829,
              "p75": 0.0006819999980507419,
              "p99": 0.000822000001790002,
              "p995": 0.0009120000031543896,
              "p999": 0.0013520000065909699
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 287799.6408273506,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003474639499636813,
              "min": 0.003276000003097579,
              "max": 0.06173499999567866,
              "p75": 0.003456999998888932,
              "p99": 0.004247999997460283,
              "p995": 0.0058309999949415214,
              "p999": 0.012502999998105224
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 289033.46991296246,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034598069223648496,
              "min": 0.0032159999973373488,
              "max": 0.1582669999988866,
              "p75": 0.003416999999899417,
              "p99": 0.004207999998470768,
              "p995": 0.005840999998326879,
              "p999": 0.013524999994842801
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42147.805782869735,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023726027522088307,
              "min": 0.022712999998475425,
              "max": 1.9805079999932786,
              "p75": 0.023264000003109686,
              "p99": 0.03807100000267383,
              "p995": 0.04067699999723118,
              "p999": 0.05051499999535736
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14913.322287477866,
            "unit": "ops/s",
            "extra": {
              "mean": 0.06705413996448403,
              "min": 0.06547200000204612,
              "max": 0.32155199999397155,
              "p75": 0.06615400000009686,
              "p99": 0.07850699999835342,
              "p995": 0.09003799999481998,
              "p999": 0.19085799998720177
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9985945910541394,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.4073869000001,
              "min": 1000.8651779999982,
              "max": 1002.077115,
              "p75": 1001.7512150000002,
              "p99": 1002.077115,
              "p995": 1002.077115,
              "p999": 1002.077115
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.332818402082196,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.6415514999994,
              "min": 3003.496508999997,
              "max": 3005.555271999998,
              "p75": 3005.245434000004,
              "p99": 3005.555271999998,
              "p995": 3005.555271999998,
              "p999": 3005.555271999998
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.150090082895248,
            "unit": "ops/s",
            "extra": {
              "mean": 98.52129309523886,
              "min": 96.70394099999976,
              "max": 99.93393600000127,
              "p75": 98.88332600000285,
              "p99": 99.93393600000127,
              "p995": 99.93393600000127,
              "p999": 99.93393600000127
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2550351.3165057153,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00039210284227434166,
              "min": 0.0003010000000358559,
              "max": 4.57469900000001,
              "p75": 0.0003510000000233049,
              "p99": 0.0007509999999228967,
              "p995": 0.0014729999999190113,
              "p999": 0.0036269999999376523
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
        "date": 1751667533848,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 8973.303743415934,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11144167506128824,
              "min": 0.07639300000005278,
              "max": 0.6834920000000011,
              "p75": 0.12878200000000106,
              "p99": 0.16654199999999264,
              "p995": 0.20274000000006254,
              "p999": 0.38617400000003954
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10340.26047866008,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0967093625991115,
              "min": 0.07717400000001362,
              "max": 0.36076600000001235,
              "p75": 0.10973599999999806,
              "p99": 0.13973199999986718,
              "p995": 0.14899900000000343,
              "p999": 0.30689600000005157
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 9718.159286194463,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1029001450326701,
              "min": 0.07765599999993356,
              "max": 2.6891960000002655,
              "p75": 0.11054699999976947,
              "p99": 0.1501220000000103,
              "p995": 0.1552310000001853,
              "p999": 0.29613499999982196
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9416.782956136814,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10619337884901668,
              "min": 0.07521100000030856,
              "max": 0.40402799999992567,
              "p75": 0.11067700000012337,
              "p99": 0.14700600000014674,
              "p995": 0.153639000000112,
              "p999": 0.2792730000001029
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6830.201102614823,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14640857347775127,
              "min": 0.13682600000004186,
              "max": 0.47680400000001555,
              "p75": 0.15018099999997503,
              "p99": 0.2431450000000268,
              "p995": 0.2930499999999938,
              "p999": 0.39195499999999583
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.225829761139753,
            "unit": "ops/s",
            "extra": {
              "mean": 70.2946694,
              "min": 69.32891300000006,
              "max": 75.33217000000002,
              "p75": 70.15438400000016,
              "p99": 75.33217000000002,
              "p995": 75.33217000000002,
              "p999": 75.33217000000002
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1943.3224062300612,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5145826532921756,
              "min": 0.36202899999989313,
              "max": 1.4405790000000707,
              "p75": 0.6180890000000545,
              "p99": 1.0852449999997589,
              "p995": 1.335124000000178,
              "p999": 1.4405790000000707
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 737.7462374267168,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3554796341463333,
              "min": 0.9389309999999114,
              "max": 6.396054000000049,
              "p75": 1.586505999999872,
              "p99": 2.51232200000004,
              "p995": 4.221176000000014,
              "p999": 6.396054000000049
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 882530.1572772,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011331057548052753,
              "min": 0.0010310000000117725,
              "max": 0.043261000000029526,
              "p75": 0.001142000000072585,
              "p99": 0.0012319999998453568,
              "p995": 0.0013730000000578002,
              "p999": 0.009747999999945023
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 512371.83604103327,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019517075874559099,
              "min": 0.0017530000000078871,
              "max": 0.21371099999998933,
              "p75": 0.0018939999999929569,
              "p99": 0.0036769999999251013,
              "p995": 0.003866999999956988,
              "p999": 0.012313000000062857
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1940816.0863591814,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005152471720676643,
              "min": 0.0004899999912595376,
              "max": 2.847569999998086,
              "p75": 0.0005010000022593886,
              "p99": 0.0005910000036237761,
              "p995": 0.0008309999975608662,
              "p999": 0.0009920000011334196
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1393212.7683908592,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007177654574290083,
              "min": 0.0006709999870508909,
              "max": 0.42403499998908956,
              "p75": 0.0006819999980507419,
              "p99": 0.0010220000112894922,
              "p995": 0.0011220000014873222,
              "p999": 0.001572999986819923
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 290455.20008643786,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034428717396087437,
              "min": 0.003214999996998813,
              "max": 0.10239200000069104,
              "p75": 0.0034069999965140596,
              "p99": 0.005239999998593703,
              "p995": 0.006080999999539927,
              "p999": 0.012563000003865454
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 287397.1171149669,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034795060230196117,
              "min": 0.003236000004108064,
              "max": 0.16409700000076555,
              "p75": 0.0034460000024409965,
              "p99": 0.005219000006036367,
              "p995": 0.006681999999273103,
              "p999": 0.013574999997217674
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41622.90523423212,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024025233086746797,
              "min": 0.0226120000006631,
              "max": 2.041968999998062,
              "p75": 0.02373399998759851,
              "p99": 0.034725000004982576,
              "p995": 0.03988500000559725,
              "p999": 0.046856999993906356
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 14978.561210544556,
            "unit": "ops/s",
            "extra": {
              "mean": 0.06676208655448318,
              "min": 0.06516299999202602,
              "max": 0.29413200000999495,
              "p75": 0.06590400000277441,
              "p99": 0.0776050000131363,
              "p995": 0.08520000000135042,
              "p999": 0.1894049999973504
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9985675825629923,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.4344722,
              "min": 1000.7854739999984,
              "max": 1002.0765760000013,
              "p75": 1001.7420810000003,
              "p99": 1002.0765760000013,
              "p995": 1002.0765760000013,
              "p999": 1002.0765760000013
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328465533483276,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.3874269999997,
              "min": 3003.442385999999,
              "max": 3005.4489380000014,
              "p75": 3004.554808000001,
              "p99": 3005.4489380000014,
              "p995": 3005.4489380000014,
              "p999": 3005.4489380000014
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.123123863015902,
            "unit": "ops/s",
            "extra": {
              "mean": 98.78373647619065,
              "min": 96.80737500000396,
              "max": 99.98373900000297,
              "p75": 99.26749600000039,
              "p99": 99.98373900000297,
              "p995": 99.98373900000297,
              "p999": 99.98373900000297
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2555391.126056171,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00039132952674189516,
              "min": 0.0003100000000131331,
              "max": 3.930029999999988,
              "p75": 0.0003609999999980573,
              "p99": 0.0007609999999544925,
              "p995": 0.00141299999995681,
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
          "id": "d0f650e6eca26fa94f8ee813a817c891e3a1e889",
          "message": "feat: Complete issue from issues/53-update-documentation-for-smart-run-command.md\n\nCo-authored-by: Claude <claude@autoagent-cli>",
          "timestamp": "2025-07-05T13:06:07+03:00",
          "tree_id": "586b8548d7c448ee4addd09b5ef32be438003d2d",
          "url": "https://github.com/carlrannaberg/autoagent/commit/d0f650e6eca26fa94f8ee813a817c891e3a1e889"
        },
        "date": 1751710233055,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4388.206601396918,
            "unit": "ops/s",
            "extra": {
              "mean": 0.22788352756264152,
              "min": 0.15034300000002077,
              "max": 0.7931590000000597,
              "p75": 0.24755600000003142,
              "p99": 0.3083400000000438,
              "p995": 0.39556399999997893,
              "p999": 0.7178209999999581
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 7821.7260521588005,
            "unit": "ops/s",
            "extra": {
              "mean": 0.12784901866052947,
              "min": 0.08148299999993469,
              "max": 0.37532599999997274,
              "p75": 0.13375199999995857,
              "p99": 0.15954000000010637,
              "p995": 0.16915799999992487,
              "p999": 0.30379100000004655
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4615.507139993346,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21666091496966935,
              "min": 0.15151400000013382,
              "max": 2.698330000000169,
              "p75": 0.23663900000019567,
              "p99": 0.2754979999999705,
              "p995": 0.29318000000012034,
              "p999": 0.6313870000001316
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9923.7268115946,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10076859419705392,
              "min": 0.07739500000025146,
              "max": 0.37216699999999037,
              "p75": 0.10963500000025306,
              "p99": 0.1496709999992163,
              "p995": 0.15513099999952829,
              "p999": 0.28887200000008306
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6805.807019250656,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14693334635722652,
              "min": 0.13810000000000855,
              "max": 0.39342999999996664,
              "p75": 0.15037299999994502,
              "p99": 0.21745999999996002,
              "p995": 0.2747459999999933,
              "p999": 0.3597469999999703
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.193606095552,
            "unit": "ops/s",
            "extra": {
              "mean": 70.45425900000005,
              "min": 68.970504,
              "max": 79.93802300000016,
              "p75": 69.820743,
              "p99": 79.93802300000016,
              "p995": 79.93802300000016,
              "p999": 79.93802300000016
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1883.5617479209996,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5309090615711219,
              "min": 0.3390180000001237,
              "max": 1.3813350000000355,
              "p75": 0.6294640000000982,
              "p99": 1.1761240000000726,
              "p995": 1.2869409999998425,
              "p999": 1.3813350000000355
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 709.9911269656645,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4084683061797763,
              "min": 0.9277150000000347,
              "max": 4.793795999999929,
              "p75": 1.5860729999999421,
              "p99": 2.5724190000000817,
              "p995": 3.0136579999998503,
              "p999": 4.793795999999929
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 908819.3038445804,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011003287405644858,
              "min": 0.001040999999986525,
              "max": 0.04816100000016377,
              "p75": 0.0010920000001988228,
              "p99": 0.0011620000000220898,
              "p995": 0.001642999999830863,
              "p999": 0.009647999999970125
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 523321.1354734784,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001910872564119244,
              "min": 0.001772999999957392,
              "max": 0.26616099999995413,
              "p75": 0.0018839999999045176,
              "p99": 0.0026649999999790452,
              "p995": 0.0036670000000071923,
              "p999": 0.011050000000068394
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1902547.7678794865,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005256109816966988,
              "min": 0.0004999999946448952,
              "max": 0.4262179999932414,
              "p75": 0.0005110000056447461,
              "p99": 0.0007919999916339293,
              "p995": 0.0008509999897796661,
              "p999": 0.0010220000112894922
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1412058.1417226782,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007081861365708519,
              "min": 0.000662000005831942,
              "max": 0.31247499999881256,
              "p75": 0.0006819999980507419,
              "p99": 0.0008309999975608662,
              "p995": 0.000941999998758547,
              "p999": 0.0013820000021951273
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 288013.88306610595,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034720548515033787,
              "min": 0.0032759999958216213,
              "max": 0.25760299999819836,
              "p75": 0.0034469999955035746,
              "p99": 0.004186999998637475,
              "p995": 0.006080999999539927,
              "p999": 0.012524000005214475
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 282588.1236151986,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0035387191337230583,
              "min": 0.0032259999934467487,
              "max": 0.30679399999644374,
              "p75": 0.003405999996175524,
              "p99": 0.005209999995713588,
              "p995": 0.007002999998803716,
              "p999": 0.05518299999675946
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41464.795613599264,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024116843823825063,
              "min": 0.023073000003932975,
              "max": 2.303192000006675,
              "p75": 0.02370399999199435,
              "p99": 0.034705000012763776,
              "p995": 0.040474999987054616,
              "p999": 0.04818000001250766
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12493.152340557961,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0800438490414933,
              "min": 0.07823599998664577,
              "max": 0.3304080000089016,
              "p75": 0.07904799999960233,
              "p99": 0.09466699999757111,
              "p995": 0.10479699999268632,
              "p999": 0.206596999996691
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9984406069047344,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.5618286000005,
              "min": 1000.8267550000019,
              "max": 1002.1906510000008,
              "p75": 1001.8130660000006,
              "p99": 1002.1906510000008,
              "p995": 1002.1906510000008,
              "p999": 1002.1906510000008
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33286898911565954,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.1849277000006,
              "min": 3003.4134889999987,
              "max": 3004.763813000005,
              "p75": 3004.459592000003,
              "p99": 3004.763813000005,
              "p995": 3004.763813000005,
              "p999": 3004.763813000005
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.153104301994967,
            "unit": "ops/s",
            "extra": {
              "mean": 98.49204442857064,
              "min": 96.73885999999766,
              "max": 100.35933899999509,
              "p75": 99.27223299999605,
              "p99": 100.35933899999509,
              "p995": 100.35933899999509,
              "p999": 100.35933899999509
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2614906.3996772203,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038242286611996453,
              "min": 0.0003009999999790125,
              "max": 4.1152629999999135,
              "p75": 0.0003510000000233049,
              "p99": 0.0007520000000340588,
              "p995": 0.001393000000007305,
              "p999": 0.002104000000031192
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
        "date": 1751712358768,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4541.320400484732,
            "unit": "ops/s",
            "extra": {
              "mean": 0.22020027476882315,
              "min": 0.1527960000000803,
              "max": 0.8887869999999793,
              "p75": 0.24380699999994704,
              "p99": 0.29760799999996834,
              "p995": 0.38544299999995246,
              "p999": 0.617367999999999
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9627.030596526984,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10387418944744568,
              "min": 0.07740599999999631,
              "max": 0.46362299999987044,
              "p75": 0.11047800000005736,
              "p99": 0.14886000000001332,
              "p995": 0.15355699999986427,
              "p999": 0.3304000000000542
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4750.846944339432,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21048878478215047,
              "min": 0.13812899999993533,
              "max": 3.1384250000000975,
              "p75": 0.2300310000000536,
              "p99": 0.2713189999999486,
              "p995": 0.2884710000000723,
              "p999": 0.7140399999998408
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9641.690950001846,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10371624699294148,
              "min": 0.07510099999990416,
              "max": 0.44155099999989034,
              "p75": 0.11454499999945256,
              "p99": 0.15145399999983056,
              "p995": 0.15755300000000716,
              "p999": 0.3944399999995767
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6885.335014344349,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14523621550972918,
              "min": 0.13706700000000183,
              "max": 0.4252079999999978,
              "p75": 0.14830800000004274,
              "p99": 0.19634899999994104,
              "p995": 0.26692099999991115,
              "p999": 0.334337000000005
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.082536121902304,
            "unit": "ops/s",
            "extra": {
              "mean": 71.00993680000002,
              "min": 69.35464500000012,
              "max": 73.379456,
              "p75": 72.82809299999997,
              "p99": 73.379456,
              "p995": 73.379456,
              "p999": 73.379456
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1787.6126647375888,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5594053005586611,
              "min": 0.3553759999999784,
              "max": 3.864440000000286,
              "p75": 0.6394399999999223,
              "p99": 1.3376499999999396,
              "p995": 1.7074029999998857,
              "p999": 3.864440000000286
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 719.7022663694231,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3894634583333383,
              "min": 0.9652409999998781,
              "max": 3.8869609999999284,
              "p75": 1.6044500000000426,
              "p99": 2.5108999999999924,
              "p995": 3.2238980000001902,
              "p999": 3.8869609999999284
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 897425.0666777979,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011142991622709259,
              "min": 0.0009620000000722939,
              "max": 0.2806359999999586,
              "p75": 0.0011219999998957064,
              "p99": 0.001211999999895852,
              "p995": 0.0012619999999969878,
              "p999": 0.009687999999869135
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 522121.423577967,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001915263298615964,
              "min": 0.0017530000000078871,
              "max": 0.18215100000003304,
              "p75": 0.0018929999999954816,
              "p99": 0.0035670000000322943,
              "p995": 0.003787000000045282,
              "p999": 0.011080999999990127
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1907427.1988640954,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005242664048177129,
              "min": 0.0004999999946448952,
              "max": 2.75016000001051,
              "p75": 0.0005110000056447461,
              "p99": 0.0006010000070091337,
              "p995": 0.0008419999940088019,
              "p999": 0.0010119999933522195
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1350801.7352426522,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007403010922401312,
              "min": 0.000690999993821606,
              "max": 3.120694999990519,
              "p75": 0.000702000004821457,
              "p99": 0.0009309999877586961,
              "p995": 0.0010119999933522195,
              "p999": 0.0015930000081425533
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 288426.7153480914,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034670852136326467,
              "min": 0.003285999999206979,
              "max": 0.053711000000475906,
              "p75": 0.0034470000027795322,
              "p99": 0.00377699999808101,
              "p995": 0.005650999999488704,
              "p999": 0.012502999998105224
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 290304.0601883186,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034446641888208713,
              "min": 0.0032159999973373488,
              "max": 0.1745980000050622,
              "p75": 0.003396000000066124,
              "p99": 0.005089999998745043,
              "p995": 0.006632999997236766,
              "p999": 0.014317000001028646
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41303.88069782329,
            "unit": "ops/s",
            "extra": {
              "mean": 0.02421080012592376,
              "min": 0.022943000003579073,
              "max": 2.3224069999996573,
              "p75": 0.023825000011129305,
              "p99": 0.035736999998334795,
              "p995": 0.04030600000987761,
              "p999": 0.0484510000096634
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12463.75872655461,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08023261858154027,
              "min": 0.07819699999527074,
              "max": 0.32328700000653043,
              "p75": 0.07899800001177937,
              "p99": 0.09814400000323076,
              "p995": 0.15034200000809506,
              "p999": 0.1983019999897806
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9985746123301464,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.4274222999996,
              "min": 1000.6091439999982,
              "max": 1001.9318189999995,
              "p75": 1001.8526739999998,
              "p99": 1001.9318189999995,
              "p995": 1001.9318189999995,
              "p999": 1001.9318189999995
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328549743241511,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.3114182999984,
              "min": 3003.4814449999976,
              "max": 3004.566030000002,
              "p75": 3004.497237000003,
              "p99": 3004.566030000002,
              "p995": 3004.566030000002,
              "p999": 3004.566030000002
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.145930704102133,
            "unit": "ops/s",
            "extra": {
              "mean": 98.56168242857079,
              "min": 94.2181270000001,
              "max": 99.85760300000402,
              "p75": 99.18232200000057,
              "p99": 99.85760300000402,
              "p995": 99.85760300000402,
              "p999": 99.85760300000402
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2569562.797445052,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038917126329596316,
              "min": 0.0003100000000131331,
              "max": 4.266834000000017,
              "p75": 0.0003600000000005821,
              "p99": 0.0007709999999860884,
              "p995": 0.0014229999999315623,
              "p999": 0.0021940000000313375
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
        "date": 1751714858093,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4754.96233407974,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2103066080740126,
              "min": 0.1450119999999515,
              "max": 0.7531440000000202,
              "p75": 0.22456099999999424,
              "p99": 0.2887719999999945,
              "p995": 0.42723100000000613,
              "p999": 0.6831320000000005
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9087.994419971576,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11003527882922355,
              "min": 0.0788990000000922,
              "max": 0.3914940000001934,
              "p75": 0.11670800000001691,
              "p99": 0.15158499999995456,
              "p995": 0.1616839999999229,
              "p999": 0.3601660000000493
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 5064.514599195086,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1974522889437286,
              "min": 0.1392510000000584,
              "max": 3.135505000000194,
              "p75": 0.20398299999988012,
              "p99": 0.2563110000000961,
              "p995": 0.2686140000000705,
              "p999": 0.5978419999996731
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9730.20594462827,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10277274763665897,
              "min": 0.07620300000007774,
              "max": 0.3554679999997461,
              "p75": 0.10988700000007157,
              "p99": 0.14704600000004575,
              "p995": 0.1506920000001628,
              "p999": 0.31275700000014695
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6795.773958966583,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14715027398469674,
              "min": 0.13829899999996087,
              "max": 0.4505359999999996,
              "p75": 0.1506330000000844,
              "p99": 0.2533050000000685,
              "p995": 0.2735139999999774,
              "p999": 0.3747130000000425
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 13.946324171312865,
            "unit": "ops/s",
            "extra": {
              "mean": 71.70348170000003,
              "min": 69.50063,
              "max": 80.18307699999991,
              "p75": 70.3978340000001,
              "p99": 80.18307699999991,
              "p995": 80.18307699999991,
              "p999": 80.18307699999991
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1780.6585195364187,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5615899898989856,
              "min": 0.33890599999995175,
              "max": 1.4168700000000172,
              "p75": 0.6310650000000351,
              "p99": 1.284983000000011,
              "p995": 1.3481309999997393,
              "p999": 1.4168700000000172
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 753.6082036165885,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3269494615384623,
              "min": 0.9480289999999059,
              "max": 4.931426999999985,
              "p75": 1.5831019999998261,
              "p99": 3.015089999999873,
              "p995": 4.338481000000002,
              "p999": 4.931426999999985
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 911919.004184435,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0010965886174225958,
              "min": 0.001011999999946056,
              "max": 0.22357999999985623,
              "p75": 0.0011019999999462016,
              "p99": 0.0011819999999715947,
              "p995": 0.001592999999957101,
              "p999": 0.009507999999868844
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 512077.4571978801,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019528295689329163,
              "min": 0.0017629999999826396,
              "max": 0.18221199999993587,
              "p75": 0.0018830000000207292,
              "p99": 0.003986999999938234,
              "p995": 0.00421799999992345,
              "p999": 0.012022999999999229
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1949393.1734328456,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005129801487090561,
              "min": 0.0004899999912595376,
              "max": 0.43150999999488704,
              "p75": 0.0005010000022593886,
              "p99": 0.0007710000063525513,
              "p995": 0.0008210000087274238,
              "p999": 0.0009909999935189262
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1408658.5293652043,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007098952508033572,
              "min": 0.0006709999870508909,
              "max": 0.3177260000084061,
              "p75": 0.0006819999980507419,
              "p99": 0.0008119999984046444,
              "p995": 0.0008720000041648746,
              "p999": 0.0013319999998202547
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 289986.7298579675,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034484336593256855,
              "min": 0.0032759999958216213,
              "max": 0.03551600000355393,
              "p75": 0.0034369999993941747,
              "p99": 0.0037070000034873374,
              "p995": 0.005882000004930887,
              "p999": 0.012283000003662892
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 288142.70796827227,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034705025403943632,
              "min": 0.0032260000007227063,
              "max": 0.16537999999854947,
              "p75": 0.0034360000063315965,
              "p99": 0.004128000000491738,
              "p995": 0.0057809999998426065,
              "p999": 0.013424999997369014
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41475.65259984398,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024110530813052516,
              "min": 0.022742000001017004,
              "max": 2.3712479999958305,
              "p75": 0.023753999994369224,
              "p99": 0.035957000000053085,
              "p995": 0.040215999993961304,
              "p999": 0.04577599999902304
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 11997.01277132056,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08335408314230926,
              "min": 0.08056099999521393,
              "max": 0.47121400000469293,
              "p75": 0.0819140000094194,
              "p99": 0.10900399999809451,
              "p995": 0.16767399999662302,
              "p999": 0.23487100000784267
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9990406507347989,
            "unit": "ops/s",
            "extra": {
              "mean": 1000.9602704999998,
              "min": 999.7789499999999,
              "max": 1001.8438420000002,
              "p75": 1001.7482729999992,
              "p99": 1001.8438420000002,
              "p995": 1001.8438420000002,
              "p999": 1001.8438420000002
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33287288337785265,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.1497818999997,
              "min": 3003.340470000003,
              "max": 3004.5843779999996,
              "p75": 3004.499407999996,
              "p99": 3004.5843779999996,
              "p995": 3004.5843779999996,
              "p999": 3004.5843779999996
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.147127055924127,
            "unit": "ops/s",
            "extra": {
              "mean": 98.55006195238059,
              "min": 94.53053299999738,
              "max": 99.8176009999952,
              "p75": 99.45498199999565,
              "p99": 99.8176009999952,
              "p995": 99.8176009999952,
              "p999": 99.8176009999952
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2597510.2233034126,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038498404781184606,
              "min": 0.0003100000000131331,
              "max": 4.044591000000082,
              "p75": 0.0003510000000233049,
              "p99": 0.0007120000000213622,
              "p995": 0.0014320000000225264,
              "p999": 0.0021539999999617976
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
        "date": 1751717771100,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4901.365459424875,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20402477804977634,
              "min": 0.15038000000004104,
              "max": 0.7892219999999952,
              "p75": 0.20991199999997434,
              "p99": 0.30382699999995566,
              "p995": 0.35596399999997175,
              "p999": 0.6627060000000142
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10075.27863020062,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09925283822945627,
              "min": 0.07773499999984779,
              "max": 0.3716229999999996,
              "p75": 0.10840200000006917,
              "p99": 0.14937799999984236,
              "p995": 0.1543380000000525,
              "p999": 0.25155999999992673
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4981.209179573795,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20075446823246287,
              "min": 0.13704600000028222,
              "max": 2.6645979999998417,
              "p75": 0.21370799999976953,
              "p99": 0.2579319999999825,
              "p995": 0.2718280000001414,
              "p999": 0.6222999999999956
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9403.538982097798,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10634294193960091,
              "min": 0.07435899999973117,
              "max": 0.4083620000001247,
              "p75": 0.1210559999999532,
              "p99": 0.14695399999982328,
              "p995": 0.15317499999991924,
              "p999": 0.3416869999996379
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6854.746075010007,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14588432438739754,
              "min": 0.13655500000004395,
              "max": 0.39888400000000956,
              "p75": 0.14752599999997074,
              "p99": 0.2484230000000025,
              "p995": 0.2748030000000199,
              "p999": 0.3341530000000148
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.297689192746052,
            "unit": "ops/s",
            "extra": {
              "mean": 69.94137209999998,
              "min": 69.30047300000001,
              "max": 70.61345299999994,
              "p75": 70.51525300000003,
              "p99": 70.61345299999994,
              "p995": 70.61345299999994,
              "p999": 70.61345299999994
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1835.663655411255,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5447621066376476,
              "min": 0.340556000000106,
              "max": 4.1352450000003955,
              "p75": 0.6329110000001492,
              "p99": 1.1873650000002272,
              "p995": 1.3569820000002437,
              "p999": 4.1352450000003955
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 717.5741716256986,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3935841611111117,
              "min": 1.0213960000000952,
              "max": 5.543723,
              "p75": 1.598011999999926,
              "p99": 2.6901390000000447,
              "p995": 4.356927999999925,
              "p999": 5.543723
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 855302.2842635558,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001169177281995726,
              "min": 0.0011019999999462016,
              "max": 0.32666999999992186,
              "p75": 0.0011620000000220898,
              "p99": 0.0012329999999565189,
              "p995": 0.0014519999999720312,
              "p999": 0.009727999999995518
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 524464.7349910523,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001906705891325678,
              "min": 0.0017629999999826396,
              "max": 0.23611000000005333,
              "p75": 0.0018540000000939472,
              "p99": 0.0036159999999654246,
              "p995": 0.0038779999999860593,
              "p999": 0.0119520000000648
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1909027.3012702414,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005238269768769746,
              "min": 0.0004999999946448952,
              "max": 2.390448000005563,
              "p75": 0.0005110000056447461,
              "p99": 0.0005910000036237761,
              "p995": 0.0008410000009462237,
              "p999": 0.0010220000112894922
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1399588.340109398,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007144958066182773,
              "min": 0.0006609999982174486,
              "max": 2.9950970000063535,
              "p75": 0.0006910000083735213,
              "p99": 0.0009120000031543896,
              "p995": 0.0009909999935189262,
              "p999": 0.0014530000044032931
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 285939.24683563155,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034972463943532626,
              "min": 0.0033159999948111363,
              "max": 0.06554199999663979,
              "p75": 0.003475999998045154,
              "p99": 0.003987999996752478,
              "p995": 0.0065930000055232085,
              "p999": 0.01289300000644289
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 292442.6541798755,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034194738206175645,
              "min": 0.0032359999968321063,
              "max": 0.17964499999652617,
              "p75": 0.0033760000005713664,
              "p99": 0.004999000004318077,
              "p995": 0.006131000001914799,
              "p999": 0.013615000003483146
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41960.76249327675,
            "unit": "ops/s",
            "extra": {
              "mean": 0.02383178809394198,
              "min": 0.02278200000000652,
              "max": 2.1335480000125244,
              "p75": 0.02348399999027606,
              "p99": 0.03267000000050757,
              "p995": 0.03657799999928102,
              "p999": 0.04490300000179559
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12509.102829730806,
            "unit": "ops/s",
            "extra": {
              "mean": 0.07994178428394291,
              "min": 0.07818599999882281,
              "max": 0.37204400000337046,
              "p75": 0.07897699999739416,
              "p99": 0.09176200001093093,
              "p995": 0.10152900000684895,
              "p999": 0.21198500000173226
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9989014665029858,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.0997415999998,
              "min": 1000.1670699999995,
              "max": 1001.7731309999999,
              "p75": 1001.6216989999994,
              "p99": 1001.7731309999999,
              "p995": 1001.7731309999999,
              "p999": 1001.7731309999999
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328753100109497,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.1278818999995,
              "min": 3002.6712879999977,
              "max": 3004.701380999999,
              "p75": 3004.479370000001,
              "p99": 3004.701380999999,
              "p995": 3004.701380999999,
              "p999": 3004.701380999999
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.171045813912901,
            "unit": "ops/s",
            "extra": {
              "mean": 98.3183065238097,
              "min": 94.58669999999984,
              "max": 100.54791400000249,
              "p75": 99.42439000000013,
              "p99": 100.54791400000249,
              "p995": 100.54791400000249,
              "p999": 100.54791400000249
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2600399.477612402,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003845562993721895,
              "min": 0.0003100000000131331,
              "max": 2.3118089999999256,
              "p75": 0.0003600000000005821,
              "p99": 0.0007109999999102001,
              "p995": 0.0011719999999968422,
              "p999": 0.0020740000000500913
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
        "date": 1751724675145,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4727.100914860197,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21154615016920467,
              "min": 0.16040099999997892,
              "max": 0.931577999999945,
              "p75": 0.22091499999999087,
              "p99": 0.30968999999998914,
              "p995": 0.41714300000001003,
              "p999": 0.7055240000000254
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9414.520169232685,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10621890250637207,
              "min": 0.07811600000013641,
              "max": 0.38701000000014574,
              "p75": 0.1295709999999417,
              "p99": 0.1530049999998937,
              "p995": 0.15562999999997373,
              "p999": 0.3333709999999428
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4800.437587110678,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2083143425684839,
              "min": 0.14014300000008006,
              "max": 3.1024250000000393,
              "p75": 0.22838500000011663,
              "p99": 0.2671600000003309,
              "p995": 0.27956399999993664,
              "p999": 0.6480980000001182
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10002.976775500176,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09997024110355363,
              "min": 0.07498000000032334,
              "max": 0.4183120000002418,
              "p75": 0.10530799999969531,
              "p99": 0.14415999999982887,
              "p995": 0.14933000000019092,
              "p999": 0.3099509999997281
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6713.243766516215,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14895928626750018,
              "min": 0.14115499999996928,
              "max": 0.4142970000000332,
              "p75": 0.14939000000003944,
              "p99": 0.20844099999999344,
              "p995": 0.2784419999999841,
              "p999": 0.37617599999998674
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.25594532616872,
            "unit": "ops/s",
            "extra": {
              "mean": 70.14617250000002,
              "min": 68.450872,
              "max": 76.19807200000002,
              "p75": 70.01698299999998,
              "p99": 76.19807200000002,
              "p995": 76.19807200000002,
              "p999": 76.19807200000002
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1919.406872565853,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5209942791666705,
              "min": 0.3421619999999166,
              "max": 3.4794309999997495,
              "p75": 0.6043439999998554,
              "p99": 1.28272700000025,
              "p995": 1.3961370000001807,
              "p999": 3.4794309999997495
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 720.0816089830602,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3887314819944594,
              "min": 0.9266179999999622,
              "max": 5.581332999999859,
              "p75": 1.5843230000000403,
              "p99": 3.03712900000005,
              "p995": 5.034457000000202,
              "p999": 5.581332999999859
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 897583.9712773239,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011141018912992965,
              "min": 0.0010310000000117725,
              "max": 0.3343879999999899,
              "p75": 0.0011120000001483277,
              "p99": 0.001191999999946347,
              "p995": 0.0012429999999312713,
              "p999": 0.009637999999995372
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 502814.53781535313,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001988804866989002,
              "min": 0.0017629999999826396,
              "max": 0.23476999999996906,
              "p75": 0.001883999999961361,
              "p99": 0.004128000000036991,
              "p995": 0.004327999999986787,
              "p999": 0.01220299999999952
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1917495.3365380457,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005215136542681019,
              "min": 0.0004999999946448952,
              "max": 0.45453199998883065,
              "p75": 0.0005110000056447461,
              "p99": 0.0005909999890718609,
              "p995": 0.0008420000085607171,
              "p999": 0.0010119999933522195
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1413833.638068753,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007072967943852042,
              "min": 0.0006709999870508909,
              "max": 0.2862569999997504,
              "p75": 0.0006819999980507419,
              "p99": 0.0008210000087274238,
              "p995": 0.0009319999953731894,
              "p999": 0.0013429999962681904
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 290582.69354030036,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003441361176113236,
              "min": 0.0032659999997122213,
              "max": 0.03421399999933783,
              "p75": 0.003426999996008817,
              "p99": 0.003576000002794899,
              "p995": 0.005850999994436279,
              "p999": 0.012393999997584615
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 290070.4922135564,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003447437870597942,
              "min": 0.0032359999968321063,
              "max": 0.16804599999886705,
              "p75": 0.0034060000034514815,
              "p99": 0.005178999999770895,
              "p995": 0.0063020000015967526,
              "p999": 0.013615000003483146
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41066.299526742514,
            "unit": "ops/s",
            "extra": {
              "mean": 0.02435086704972764,
              "min": 0.022923000011360273,
              "max": 3.8697030000039376,
              "p75": 0.02369400000316091,
              "p99": 0.04025499999988824,
              "p995": 0.04883200000040233,
              "p999": 0.06222700000216719
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12308.671192308304,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08124353834595083,
              "min": 0.07899799999722745,
              "max": 0.33303399999567773,
              "p75": 0.08014999999431893,
              "p99": 0.10022799999569543,
              "p995": 0.12589599999773782,
              "p999": 0.2223870000016177
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9984491197655184,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.5532892000003,
              "min": 1000.8525140000002,
              "max": 1002.2059719999997,
              "p75": 1001.7789389999998,
              "p99": 1002.2059719999997,
              "p995": 1002.2059719999997,
              "p999": 1002.2059719999997
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33290110955762053,
            "unit": "ops/s",
            "extra": {
              "mean": 3003.8950645999994,
              "min": 3002.535388999997,
              "max": 3004.5799430000006,
              "p75": 3004.5404849999977,
              "p99": 3004.5799430000006,
              "p995": 3004.5799430000006,
              "p999": 3004.5799430000006
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.1471963365861,
            "unit": "ops/s",
            "extra": {
              "mean": 98.54938909523827,
              "min": 96.42071499999292,
              "max": 99.72965999999724,
              "p75": 99.31390800000372,
              "p99": 99.72965999999724,
              "p995": 99.72965999999724,
              "p999": 99.72965999999724
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2614560.7527155033,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038247342271981714,
              "min": 0.0003199999998741987,
              "max": 1.1483530000000428,
              "p75": 0.0003609999999980573,
              "p99": 0.0007019999999897664,
              "p995": 0.0009119999999711581,
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
          "id": "9668a8c035259b416a68abc9bfa11c6f2c3d1c26",
          "message": "chore: prepare for v0.5.1 release\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-05T17:26:56+03:00",
          "tree_id": "2cc96e0548fd6372f51a705314ee14b835d4ab99",
          "url": "https://github.com/carlrannaberg/autoagent/commit/9668a8c035259b416a68abc9bfa11c6f2c3d1c26"
        },
        "date": 1751725831802,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4384.777506492078,
            "unit": "ops/s",
            "extra": {
              "mean": 0.22806174281805755,
              "min": 0.15309700000000248,
              "max": 1.4091920000000755,
              "p75": 0.2692260000000033,
              "p99": 0.3210119999999961,
              "p995": 0.456527000000051,
              "p999": 0.776738000000023
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10565.177226258214,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09465056558773526,
              "min": 0.07937799999990602,
              "max": 0.36406299999998737,
              "p75": 0.10633999999993193,
              "p99": 0.1401740000000018,
              "p995": 0.15073300000017298,
              "p999": 0.2882919999999558
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4896.615767457351,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20422268102920124,
              "min": 0.14152599999988524,
              "max": 2.743549999999914,
              "p75": 0.21478299999989758,
              "p99": 0.2636849999998958,
              "p995": 0.2817490000002181,
              "p999": 0.5655819999999494
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10034.744713644108,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09965375587884298,
              "min": 0.07764500000030239,
              "max": 0.37311099999988073,
              "p75": 0.10873499999979686,
              "p99": 0.13720799999964584,
              "p995": 0.14954099999977188,
              "p999": 0.27939500000002226
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6863.998046329841,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14568768715409192,
              "min": 0.13747800000004418,
              "max": 0.37194799999997485,
              "p75": 0.15005199999995966,
              "p99": 0.187562000000014,
              "p995": 0.2600590000000125,
              "p999": 0.3599659999999858
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.298245329198988,
            "unit": "ops/s",
            "extra": {
              "mean": 69.93865170000001,
              "min": 68.40760399999999,
              "max": 79.73609799999997,
              "p75": 69.32569000000001,
              "p99": 79.73609799999997,
              "p995": 79.73609799999997,
              "p999": 79.73609799999997
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1829.5213350150407,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5465910568305993,
              "min": 0.35055800000009185,
              "max": 1.9145950000001903,
              "p75": 0.6449999999999818,
              "p99": 1.1810289999998531,
              "p995": 1.2757779999997183,
              "p999": 1.9145950000001903
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 745.9581771088405,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3405577292225233,
              "min": 0.8986180000001696,
              "max": 4.833133999999973,
              "p75": 1.5797159999999622,
              "p99": 2.5926869999998416,
              "p995": 3.6422680000000582,
              "p999": 4.833133999999973
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 863344.8828317171,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011582856629902788,
              "min": 0.0010310000000117725,
              "max": 0.5100070000000869,
              "p75": 0.0011320000000978325,
              "p99": 0.0021229999999832216,
              "p995": 0.00228400000014517,
              "p999": 0.010058999999955631
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 519323.42043509474,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019255823262547822,
              "min": 0.0017829999999889878,
              "max": 0.12802099999998973,
              "p75": 0.0019139999999993051,
              "p99": 0.0020440000000689906,
              "p995": 0.002605000000016844,
              "p999": 0.011241000000040913
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1954317.769354336,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000511687513505226,
              "min": 0.0004899999912595376,
              "max": 0.4573780000064289,
              "p75": 0.0005010000022593886,
              "p99": 0.0005810000002384186,
              "p995": 0.000822000001790002,
              "p999": 0.0009920000011334196
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1407054.576053653,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007107044865343365,
              "min": 0.0006709999870508909,
              "max": 0.5269489999918733,
              "p75": 0.0006819999980507419,
              "p99": 0.0009319999953731894,
              "p995": 0.0010020000045187771,
              "p999": 0.0015120000025490299
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 293044.25990279607,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003412453805891656,
              "min": 0.0031860000017331913,
              "max": 0.22540300000400748,
              "p75": 0.003386000003956724,
              "p99": 0.00506899999891175,
              "p995": 0.006191000000399072,
              "p999": 0.012633999998797663
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 293310.9839716496,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003409350670947449,
              "min": 0.0032160000046133064,
              "max": 0.1512840000068536,
              "p75": 0.0033660000044619665,
              "p99": 0.00506899999891175,
              "p995": 0.0065420000028098,
              "p999": 0.013374999994994141
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42336.60907296954,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023620219519150516,
              "min": 0.022431999997934327,
              "max": 0.316793999998481,
              "p75": 0.023363999993307516,
              "p99": 0.03596799999650102,
              "p995": 0.03996499998902436,
              "p999": 0.045685999997658655
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12448.788638252932,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08032910101205963,
              "min": 0.07840700000815559,
              "max": 0.35709000000497326,
              "p75": 0.0792290000099456,
              "p99": 0.09697200001392048,
              "p995": 0.10353399999439716,
              "p999": 0.2317050000128802
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9990140359844661,
            "unit": "ops/s",
            "extra": {
              "mean": 1000.9869371000001,
              "min": 1000.0197660000013,
              "max": 1001.8149259999991,
              "p75": 1001.6726879999987,
              "p99": 1001.8149259999991,
              "p995": 1001.8149259999991,
              "p999": 1001.8149259999991
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328707944961522,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.168633999999,
              "min": 3003.5097040000037,
              "max": 3004.517076999997,
              "p75": 3004.4533880000017,
              "p99": 3004.517076999997,
              "p995": 3004.517076999997,
              "p999": 3004.517076999997
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.136701808386624,
            "unit": "ops/s",
            "extra": {
              "mean": 98.65141728571395,
              "min": 96.17308000000048,
              "max": 99.78796200000215,
              "p75": 99.21105399999942,
              "p99": 99.78796200000215,
              "p995": 99.78796200000215,
              "p999": 99.78796200000215
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2626397.46946738,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038074968150300377,
              "min": 0.0003100000000131331,
              "max": 4.146945000000187,
              "p75": 0.0003510000000233049,
              "p99": 0.0007420000000024629,
              "p995": 0.001282999999830281,
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
          "id": "0120cbb38e6f975ab7a1d4d301472eef65a1351b",
          "message": "chore: prepare for v0.5.2 release\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-05T18:18:54+03:00",
          "tree_id": "ae9a89fba81bf29612ff8344c479be1fdea4c366",
          "url": "https://github.com/carlrannaberg/autoagent/commit/0120cbb38e6f975ab7a1d4d301472eef65a1351b"
        },
        "date": 1751728943982,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4496.319626436565,
            "unit": "ops/s",
            "extra": {
              "mean": 0.22240411783014694,
              "min": 0.16407700000002023,
              "max": 0.6594139999999697,
              "p75": 0.24547899999993206,
              "p99": 0.30231599999996206,
              "p995": 0.3325930000000312,
              "p999": 0.5961350000000039
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10337.09736465807,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09673895531050539,
              "min": 0.0765639999999621,
              "max": 0.3636510000000044,
              "p75": 0.10895400000003974,
              "p99": 0.14030300000001716,
              "p995": 0.15058199999998578,
              "p999": 0.27800000000002
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4902.490427887463,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20397796073431826,
              "min": 0.14227600000003804,
              "max": 2.774992999999995,
              "p75": 0.2177679999999782,
              "p99": 0.25778300000001764,
              "p995": 0.26767199999994773,
              "p999": 0.6328039999998509
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10109.695415097396,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0989149483679441,
              "min": 0.07641300000022966,
              "max": 0.30447000000003754,
              "p75": 0.10912400000052003,
              "p99": 0.14314500000000407,
              "p995": 0.14705499999990934,
              "p999": 0.2719990000005055
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6767.929180389088,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14775568321512933,
              "min": 0.13969199999996817,
              "max": 0.4021019999998998,
              "p75": 0.14871799999991708,
              "p99": 0.2551970000000665,
              "p995": 0.27134799999998904,
              "p999": 0.34811099999990347
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.231629863406184,
            "unit": "ops/s",
            "extra": {
              "mean": 70.26602079999999,
              "min": 68.50374,
              "max": 75.586903,
              "p75": 69.98487699999998,
              "p99": 75.586903,
              "p995": 75.586903,
              "p999": 75.586903
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1855.3192944827385,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5389907834051816,
              "min": 0.33744200000001,
              "max": 1.6489959999998973,
              "p75": 0.6390249999999469,
              "p99": 1.0924880000002304,
              "p995": 1.2169679999997243,
              "p999": 1.6489959999998973
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 708.5625773616847,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4113079521126777,
              "min": 0.9536540000001423,
              "max": 4.515522000000146,
              "p75": 1.588993999999957,
              "p99": 3.13388400000008,
              "p995": 3.786104999999907,
              "p999": 4.515522000000146
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 901525.5654645038,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011092308840789868,
              "min": 0.0010419999998703133,
              "max": 0.040265999999974156,
              "p75": 0.0011020000001735752,
              "p99": 0.001182999999855383,
              "p995": 0.0017129999998815038,
              "p999": 0.0095969999999852
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 497726.39035284036,
            "unit": "ops/s",
            "extra": {
              "mean": 0.002009135981901815,
              "min": 0.0018129999999700885,
              "max": 0.271077000000048,
              "p75": 0.0019330000000081782,
              "p99": 0.0041279999999801475,
              "p995": 0.004417999999986932,
              "p999": 0.012493999999946936
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1949916.7442418416,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005128424087607985,
              "min": 0.0004899999912595376,
              "max": 0.4190250000101514,
              "p75": 0.0005010000022593886,
              "p99": 0.0005710000114049762,
              "p995": 0.0008119999984046444,
              "p999": 0.0009519999875919893
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1417710.962253049,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007053623951745312,
              "min": 0.0006609999982174486,
              "max": 0.267571999997017,
              "p75": 0.0006819999980507419,
              "p99": 0.0008119999984046444,
              "p995": 0.0009220000065397471,
              "p999": 0.0013719999988097697
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 294887.45563748246,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033911242437838452,
              "min": 0.0032159999973373488,
              "max": 0.027851999999256805,
              "p75": 0.0033760000005713664,
              "p99": 0.0037069999962113798,
              "p995": 0.006210999999893829,
              "p999": 0.012713999996776693
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 288707.74824730447,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034637102955179747,
              "min": 0.0032260000007227063,
              "max": 0.19186900000204332,
              "p75": 0.003426000002946239,
              "p99": 0.004818999994313344,
              "p995": 0.0065420000028098,
              "p999": 0.01402599999710219
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41764.11518545561,
            "unit": "ops/s",
            "extra": {
              "mean": 0.02394400062253087,
              "min": 0.02269199999864213,
              "max": 2.3251100000052247,
              "p75": 0.02360400000179652,
              "p99": 0.03295100000104867,
              "p995": 0.03992499999003485,
              "p999": 0.045726000011200085
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12244.986842749211,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08166607386696732,
              "min": 0.0796789999876637,
              "max": 0.34453600000415463,
              "p75": 0.08068199999979697,
              "p99": 0.09487800000351854,
              "p995": 0.10331400000723079,
              "p999": 0.1993640000000596
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9983236485728234,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.6791663,
              "min": 999.830774,
              "max": 1003.7260960000003,
              "p75": 1001.874593999999,
              "p99": 1003.7260960000003,
              "p995": 1003.7260960000003,
              "p999": 1003.7260960000003
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33284422207743275,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.4084700000003,
              "min": 3003.5561709999965,
              "max": 3004.795032000002,
              "p75": 3004.5844789999974,
              "p99": 3004.795032000002,
              "p995": 3004.795032000002,
              "p999": 3004.795032000002
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.138680698322728,
            "unit": "ops/s",
            "extra": {
              "mean": 98.63216228571366,
              "min": 96.32074399999692,
              "max": 99.93005900000571,
              "p75": 99.07653200000641,
              "p99": 99.93005900000571,
              "p995": 99.93005900000571,
              "p999": 99.93005900000571
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2603834.0707566347,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038404904952695976,
              "min": 0.00030999999989944627,
              "max": 4.241600999999946,
              "p75": 0.0003510000000233049,
              "p99": 0.000711000000023887,
              "p995": 0.0013120000000981236,
              "p999": 0.0020640000000184955
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
        "date": 1751736297743,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4375.380524874494,
            "unit": "ops/s",
            "extra": {
              "mean": 0.22855154981718637,
              "min": 0.15902900000003228,
              "max": 0.8832270000000335,
              "p75": 0.260148000000072,
              "p99": 0.3130179999999996,
              "p995": 0.3914640000000418,
              "p999": 0.72171400000002
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 8721.09841284608,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11466445540013759,
              "min": 0.07888800000000629,
              "max": 0.3899020000001201,
              "p75": 0.13261800000009316,
              "p99": 0.1557220000001962,
              "p995": 0.16281600000002072,
              "p999": 0.2919679999999971
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 5024.3341944594595,
            "unit": "ops/s",
            "extra": {
              "mean": 0.19903134650213777,
              "min": 0.13942099999985658,
              "max": 2.7896330000000944,
              "p75": 0.2073379999997087,
              "p99": 0.2622919999998885,
              "p995": 0.2739639999999781,
              "p999": 0.5794069999997191
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 7311.026975419793,
            "unit": "ops/s",
            "extra": {
              "mean": 0.13677968955142322,
              "min": 0.10356400000000576,
              "max": 0.5880530000004001,
              "p75": 0.13922099999990678,
              "p99": 0.17000800000005256,
              "p995": 0.1791760000000977,
              "p999": 0.5387909999999465
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6784.217189133274,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14740094134983853,
              "min": 0.13916100000005827,
              "max": 0.40566100000000915,
              "p75": 0.15019200000006094,
              "p99": 0.2157839999999851,
              "p995": 0.2656379999999672,
              "p999": 0.35502600000006623
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.25461838552726,
            "unit": "ops/s",
            "extra": {
              "mean": 70.15270229999996,
              "min": 68.97756200000003,
              "max": 74.15132299999993,
              "p75": 70.24818299999993,
              "p99": 74.15132299999993,
              "p995": 74.15132299999993,
              "p999": 74.15132299999993
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1886.5863431213504,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5300579025423791,
              "min": 0.3427929999998014,
              "max": 1.3390720000002148,
              "p75": 0.615795000000162,
              "p99": 1.1530729999999494,
              "p995": 1.2409850000003644,
              "p999": 1.3390720000002148
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 704.9875983294929,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4184646685552416,
              "min": 0.9281910000001972,
              "max": 4.8353219999999055,
              "p75": 1.6113530000000083,
              "p99": 2.8656060000000707,
              "p995": 3.3247890000000098,
              "p999": 4.8353219999999055
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 883606.4236461184,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001131725588722629,
              "min": 0.0010219999999208085,
              "max": 0.5183220000001256,
              "p75": 0.0011019999999462016,
              "p99": 0.002023999999892112,
              "p995": 0.002103999999917505,
              "p999": 0.00994900000000598
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 514565.9763299913,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019433853888518656,
              "min": 0.0017629999999826396,
              "max": 0.1610109999999736,
              "p75": 0.0018939999999929569,
              "p99": 0.0036670000000071923,
              "p995": 0.003877000000102271,
              "p999": 0.011581999999975778
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1921267.731012809,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005204896662022442,
              "min": 0.0004999999946448952,
              "max": 0.3961529999942286,
              "p75": 0.0005110000056447461,
              "p99": 0.0005819999933009967,
              "p995": 0.0008320000051753595,
              "p999": 0.0009809999901335686
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1412292.6696282604,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007080685338848477,
              "min": 0.0006609999982174486,
              "max": 0.46601399999053683,
              "p75": 0.0006819999980507419,
              "p99": 0.0008719999896129593,
              "p995": 0.000981999997748062,
              "p999": 0.0013820000021951273
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 290178.7719639292,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00344615146460233,
              "min": 0.003276999996160157,
              "max": 0.04721599999902537,
              "p75": 0.0034159999995608814,
              "p99": 0.005160000000614673,
              "p995": 0.006583000002137851,
              "p999": 0.01281399999425048
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 293559.8074243508,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034064608802337353,
              "min": 0.003205999993951991,
              "max": 0.1598699999958626,
              "p75": 0.003365999997186009,
              "p99": 0.005178999999770895,
              "p995": 0.0063919999956851825,
              "p999": 0.013676000002305955
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41642.58198683322,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024013880799134538,
              "min": 0.022983000002568588,
              "max": 2.4240800000115996,
              "p75": 0.023605000009411015,
              "p99": 0.035325999997439794,
              "p995": 0.040476000009221025,
              "p999": 0.04842000000644475
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12388.735655358247,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0807184871659999,
              "min": 0.07880800000566524,
              "max": 0.33521800000744406,
              "p75": 0.07969899999443442,
              "p99": 0.09171200000855606,
              "p995": 0.1046760000026552,
              "p999": 0.20284099999116734
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986448997883265,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3569389999997,
              "min": 999.8772739999986,
              "max": 1002.0974650000007,
              "p75": 1001.7983480000003,
              "p99": 1002.0974650000007,
              "p995": 1002.0974650000007,
              "p999": 1002.0974650000007
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328701943994516,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.1740498999975,
              "min": 3003.459514999995,
              "max": 3004.5762549999963,
              "p75": 3004.5182239999995,
              "p99": 3004.5762549999963,
              "p995": 3004.5762549999963,
              "p999": 3004.5762549999963
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.16189978907654,
            "unit": "ops/s",
            "extra": {
              "mean": 98.40679604761924,
              "min": 94.7185329999993,
              "max": 99.83524200000102,
              "p75": 99.31708899999649,
              "p99": 99.83524200000102,
              "p995": 99.83524200000102,
              "p999": 99.83524200000102
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2505641.809571513,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003990993430026652,
              "min": 0.00030999999989944627,
              "max": 1.1701349999999593,
              "p75": 0.0003600000000005821,
              "p99": 0.0007209999999986394,
              "p995": 0.0009310000000368746,
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
          "id": "25eaf913fe0900c47eb5d3c567a4c430a813629b",
          "message": "docs: consolidate all unreleased changes into v0.5.2 changelog\n\nSince v0.5.2 hasn't been released yet due to test failures, all recent fixes\nare now properly included in the v0.5.2 changelog section:\n\n- Status command fixes\n- TODO.md sync improvements\n- All test failure resolutions\n- Rate limiting enhancements\n\n🤖 Generated with Claude Code\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-05T21:05:51+03:00",
          "tree_id": "71ef30b01a64dce4b0fa7afbbef0d2dba003dda4",
          "url": "https://github.com/carlrannaberg/autoagent/commit/25eaf913fe0900c47eb5d3c567a4c430a813629b"
        },
        "date": 1751739102796,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4454.891462628035,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2244723599640919,
              "min": 0.15401600000006965,
              "max": 3.47052599999995,
              "p75": 0.23750200000000632,
              "p99": 0.4653729999999996,
              "p995": 0.7435329999999567,
              "p999": 1.461546999999996
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9302.368513400776,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10749950386930203,
              "min": 0.078516000000036,
              "max": 0.4058949999998731,
              "p75": 0.1163259999998445,
              "p99": 0.14823599999999715,
              "p995": 0.1545170000000553,
              "p999": 0.3076220000000376
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4775.214406364433,
            "unit": "ops/s",
            "extra": {
              "mean": 0.209414680661709,
              "min": 0.13999100000000908,
              "max": 2.558046000000104,
              "p75": 0.22367599999961385,
              "p99": 0.26714700000002267,
              "p995": 0.28075200000012046,
              "p999": 0.6232390000000123
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 6993.644848727303,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1429869576780095,
              "min": 0.10847200000034718,
              "max": 0.6409330000005866,
              "p75": 0.15107099999977436,
              "p99": 0.18989300000021103,
              "p995": 0.1950329999999667,
              "p999": 0.5090679999998429
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6492.659110070009,
            "unit": "ops/s",
            "extra": {
              "mean": 0.15402009916846185,
              "min": 0.13838600000008228,
              "max": 0.836748,
              "p75": 0.15053100000000086,
              "p99": 0.2851660000000038,
              "p995": 0.3241330000000744,
              "p999": 0.4006439999999998
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.125973199918297,
            "unit": "ops/s",
            "extra": {
              "mean": 70.79158270000002,
              "min": 69.44045600000004,
              "max": 73.70993199999998,
              "p75": 71.46870899999999,
              "p99": 73.70993199999998,
              "p995": 73.70993199999998,
              "p999": 73.70993199999998
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1746.330644117983,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5726292459954333,
              "min": 0.3514740000000529,
              "max": 1.5009320000003754,
              "p75": 0.6383280000000013,
              "p99": 1.3631769999997232,
              "p995": 1.4225769999998192,
              "p999": 1.5009320000003754
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 696.1419845127831,
            "unit": "ops/s",
            "extra": {
              "mean": 1.436488564469907,
              "min": 0.9306610000001001,
              "max": 4.713158000000021,
              "p75": 1.595167000000174,
              "p99": 2.9259640000000218,
              "p995": 3.4182740000001104,
              "p999": 4.713158000000021
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 837782.2909240589,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011936275221299056,
              "min": 0.0010720000000219443,
              "max": 4.125876000000062,
              "p75": 0.0011819999999715947,
              "p99": 0.0015829999999823485,
              "p995": 0.002234000000044034,
              "p999": 0.009939000000031228
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 521142.41781162063,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019188612667516039,
              "min": 0.001772999999957392,
              "max": 0.22503800000004048,
              "p75": 0.00187299999993229,
              "p99": 0.003585999999984324,
              "p995": 0.0037879999999859137,
              "p999": 0.01104099999997743
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1952640.3676065914,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005121270750054857,
              "min": 0.0004899999912595376,
              "max": 0.42424900000332855,
              "p75": 0.0005010000022593886,
              "p99": 0.0005719999899156392,
              "p995": 0.0008209999941755086,
              "p999": 0.0009920000011334196
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1403076.9644982438,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007127192772048761,
              "min": 0.0006609999982174486,
              "max": 3.091844000009587,
              "p75": 0.0006819999980507419,
              "p99": 0.0009320000099251047,
              "p995": 0.0009920000011334196,
              "p999": 0.0013830000098096207
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 288509.2054454968,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003466093910091591,
              "min": 0.0032559999963268638,
              "max": 0.11226900000474416,
              "p75": 0.003426000002946239,
              "p99": 0.005270000001473818,
              "p995": 0.006461999997554813,
              "p999": 0.012623999995412305
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 290342.7701077066,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034442049293290007,
              "min": 0.003205999993951991,
              "max": 0.1150839999972959,
              "p75": 0.0034060000034514815,
              "p99": 0.004729000000224914,
              "p995": 0.006061000000045169,
              "p999": 0.013095000002067536
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41907.31179818966,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023862184356172392,
              "min": 0.022340999988955446,
              "max": 2.1129220000002533,
              "p75": 0.02338400000007823,
              "p99": 0.03978399999323301,
              "p995": 0.04817900000489317,
              "p999": 0.061673999996855855
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12459.597885158939,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08025941199845099,
              "min": 0.07837499999732245,
              "max": 0.34796700000879355,
              "p75": 0.07922700000926852,
              "p99": 0.09191100001044106,
              "p995": 0.10712000000057742,
              "p999": 0.2217219999874942
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986137730925451,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3881512,
              "min": 999.905326000001,
              "max": 1002.1903709999988,
              "p75": 1001.8184870000005,
              "p99": 1002.1903709999988,
              "p995": 1002.1903709999988,
              "p999": 1002.1903709999988
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328982747810264,
            "unit": "ops/s",
            "extra": {
              "mean": 3003.920644100001,
              "min": 3002.5367350000015,
              "max": 3004.5498110000044,
              "p75": 3004.4482840000055,
              "p99": 3004.5498110000044,
              "p995": 3004.5498110000044,
              "p999": 3004.5498110000044
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.154358281206557,
            "unit": "ops/s",
            "extra": {
              "mean": 98.47988147619097,
              "min": 96.37148600000364,
              "max": 99.95619600000646,
              "p75": 99.24052500000107,
              "p99": 99.95619600000646,
              "p995": 99.95619600000646,
              "p999": 99.95619600000646
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2627054.4658000087,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038065446035412637,
              "min": 0.00029999999992469384,
              "max": 3.943057000000067,
              "p75": 0.00035099999990961805,
              "p99": 0.0007309999999733918,
              "p995": 0.0013830000000325526,
              "p999": 0.002143999999987045
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
        "date": 1751743723629,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4587.263567795499,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2179948863240422,
              "min": 0.16386799999997947,
              "max": 0.7332110000000966,
              "p75": 0.23363999999997986,
              "p99": 0.3074290000000701,
              "p995": 0.39656700000000455,
              "p999": 0.7100309999999581
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9233.88533361174,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10829677474550793,
              "min": 0.07995100000016464,
              "max": 0.4000829999999951,
              "p75": 0.12096699999983684,
              "p99": 0.16037200000005214,
              "p995": 0.16832700000009027,
              "p999": 0.3429559999999583
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4682.930282875399,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21354150918214887,
              "min": 0.14187700000002224,
              "max": 2.8606180000001586,
              "p75": 0.23167699999999058,
              "p99": 0.2652689999999893,
              "p995": 0.27742199999966033,
              "p999": 0.6629590000000007
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10395.655737464773,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09619402808772444,
              "min": 0.07415899999978137,
              "max": 0.3625629999996818,
              "p75": 0.10148100000014892,
              "p99": 0.1422179999999571,
              "p995": 0.14796899999964808,
              "p999": 0.3175379999997858
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6643.961048081884,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1505126223292204,
              "min": 0.1398629999999912,
              "max": 0.4733250000000453,
              "p75": 0.1504330000000209,
              "p99": 0.29519499999997834,
              "p995": 0.32408900000001495,
              "p999": 0.3639349999999695
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 13.921665962552888,
            "unit": "ops/s",
            "extra": {
              "mean": 71.8304837,
              "min": 69.11033500000008,
              "max": 76.4180419999999,
              "p75": 75.23024400000008,
              "p99": 76.4180419999999,
              "p995": 76.4180419999999,
              "p999": 76.4180419999999
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1816.897640961918,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5503887381738088,
              "min": 0.3481849999998303,
              "max": 1.8630029999999351,
              "p75": 0.629624000000149,
              "p99": 1.2496099999998478,
              "p995": 1.3871879999996963,
              "p999": 1.8630029999999351
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 705.3809665138405,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4176736366197071,
              "min": 0.9187480000000505,
              "max": 5.213423000000148,
              "p75": 1.5887569999999869,
              "p99": 2.6711230000000796,
              "p995": 3.3718699999999444,
              "p999": 5.213423000000148
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 913218.4639666261,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0010950282319702916,
              "min": 0.001031999999895561,
              "max": 0.3776690000001963,
              "p75": 0.0010919999999714491,
              "p99": 0.0011520000000473374,
              "p995": 0.0012120000001232256,
              "p999": 0.009608000000071115
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 528854.9782521831,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0018908775394436256,
              "min": 0.0017329999999446954,
              "max": 0.1846790000000169,
              "p75": 0.0018330000000332802,
              "p99": 0.003757000000007338,
              "p995": 0.004017999999973654,
              "p999": 0.011802999999986241
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1906431.3174886184,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005245402710428198,
              "min": 0.0004999999946448952,
              "max": 2.69239799999923,
              "p75": 0.0005110000056447461,
              "p99": 0.000622000006842427,
              "p995": 0.0008519999973941594,
              "p999": 0.0010519999923417345
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1413865.7030726506,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007072807536294101,
              "min": 0.0006609999982174486,
              "max": 0.17926799999258947,
              "p75": 0.0006819999980507419,
              "p99": 0.0008119999984046444,
              "p995": 0.0008920000109355897,
              "p999": 0.0014119999977992848
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 280434.45929232234,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003565895584028812,
              "min": 0.003346999998029787,
              "max": 0.03747999999905005,
              "p75": 0.0035560000033001415,
              "p99": 0.003906999998434912,
              "p995": 0.0057809999998426065,
              "p999": 0.012554000000818633
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 286861.3511194709,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034860046363775366,
              "min": 0.003276000003097579,
              "max": 0.16266599999653408,
              "p75": 0.0034470000027795322,
              "p99": 0.004198000002361368,
              "p995": 0.005821999999170657,
              "p999": 0.012814000001526438
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41008.50589602541,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024385184930546838,
              "min": 0.022983000002568588,
              "max": 2.3309169999993173,
              "p75": 0.023975000003702007,
              "p99": 0.03608800000802148,
              "p995": 0.04020600000512786,
              "p999": 0.05032500000379514
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12227.984018027219,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08177962929340934,
              "min": 0.07940000000235159,
              "max": 0.4183069999999134,
              "p75": 0.08029099999112077,
              "p99": 0.10666099999798462,
              "p995": 0.1624359999987064,
              "p999": 0.2486979999957839
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9987349945656241,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.2666076999997,
              "min": 999.8568670000004,
              "max": 1002.181704999999,
              "p75": 1001.7725699999992,
              "p99": 1002.181704999999,
              "p995": 1002.181704999999,
              "p999": 1002.181704999999
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328525064631411,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.3336930999994,
              "min": 3003.4379289999997,
              "max": 3004.718688000001,
              "p75": 3004.4999199999947,
              "p99": 3004.718688000001,
              "p995": 3004.718688000001,
              "p999": 3004.718688000001
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.189170464916403,
            "unit": "ops/s",
            "extra": {
              "mean": 98.14341642857228,
              "min": 96.55364800000098,
              "max": 99.65848499999993,
              "p75": 98.70895200000086,
              "p99": 99.65848499999993,
              "p995": 99.65848499999993,
              "p999": 99.65848499999993
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2547517.261219584,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003925390478105203,
              "min": 0.0003100000000131331,
              "max": 4.168361000000004,
              "p75": 0.0003609999999980573,
              "p99": 0.0008420000000342043,
              "p995": 0.0015319999999974243,
              "p999": 0.002425000000016553
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
        "date": 1751794272119,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4303.949873732953,
            "unit": "ops/s",
            "extra": {
              "mean": 0.23234471342313012,
              "min": 0.16392799999994168,
              "max": 0.7128270000000043,
              "p75": 0.24902699999995548,
              "p99": 0.30395999999996093,
              "p995": 0.44397300000002815,
              "p999": 0.5996039999999994
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10153.384691171297,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0984893245372189,
              "min": 0.07765600000016093,
              "max": 0.33019899999999325,
              "p75": 0.11095799999998235,
              "p99": 0.15068199999996068,
              "p995": 0.1535079999998743,
              "p999": 0.2610500000000684
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4821.760471815908,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2073931307548741,
              "min": 0.13951200000019526,
              "max": 3.074477999999999,
              "p75": 0.223308999999972,
              "p99": 0.26904500000000553,
              "p995": 0.2800959999999577,
              "p999": 0.5937440000002425
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9940.889741788442,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10059461738080724,
              "min": 0.07547100000010687,
              "max": 0.355837000000065,
              "p75": 0.10998700000027384,
              "p99": 0.14645500000005995,
              "p995": 0.15144400000008318,
              "p999": 0.32883700000002136
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6895.1026575499245,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14503047302784258,
              "min": 0.13682700000003933,
              "max": 0.4315990000000056,
              "p75": 0.14758599999993294,
              "p99": 0.1831440000000839,
              "p995": 0.2715400000000159,
              "p999": 0.34238300000004074
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.294789455326764,
            "unit": "ops/s",
            "extra": {
              "mean": 69.95555990000001,
              "min": 68.66366800000003,
              "max": 73.295481,
              "p75": 70.12753299999997,
              "p99": 73.295481,
              "p995": 73.295481,
              "p999": 73.295481
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1906.3294606176962,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5245682976939233,
              "min": 0.34088999999994485,
              "max": 1.3791689999998198,
              "p75": 0.6258739999998397,
              "p99": 1.1488749999998618,
              "p995": 1.2377119999996467,
              "p999": 1.3791689999998198
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 734.7064009703996,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3610879103260851,
              "min": 0.9956279999998969,
              "max": 3.802774999999883,
              "p75": 1.5925979999999527,
              "p99": 2.6495700000000397,
              "p995": 3.386823999999933,
              "p999": 3.802774999999883
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 913939.5704484031,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001094164244917608,
              "min": 0.0010219999999208085,
              "max": 0.04690800000003037,
              "p75": 0.0010919999999714491,
              "p99": 0.0011619999997947161,
              "p995": 0.001211999999895852,
              "p999": 0.009768000000121901
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 514807.0012744149,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019424755248558785,
              "min": 0.0017829999999889878,
              "max": 0.2673510000000192,
              "p75": 0.001874000000043452,
              "p99": 0.00384699999995064,
              "p995": 0.004097999999999047,
              "p999": 0.011301000000003114
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1904325.4326657837,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005251203301948989,
              "min": 0.0004999999946448952,
              "max": 2.6321699999971315,
              "p75": 0.0005110000056447461,
              "p99": 0.0007310000073630363,
              "p995": 0.0008420000085607171,
              "p999": 0.0010420000035082921
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1413504.9172744693,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007074612813715622,
              "min": 0.0006709999870508909,
              "max": 0.2984900000010384,
              "p75": 0.0006819999980507419,
              "p99": 0.0008209999941755086,
              "p995": 0.0009319999953731894,
              "p999": 0.001352999999653548
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 289792.90979941277,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034507400498244574,
              "min": 0.003276000003097579,
              "max": 0.039994999999180436,
              "p75": 0.0034369999993941747,
              "p99": 0.0036469999977271073,
              "p995": 0.005880999997316394,
              "p999": 0.012253000000782777
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 292007.4784751723,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003424569826847857,
              "min": 0.0032159999973373488,
              "max": 0.16088199999649078,
              "p75": 0.003377000000909902,
              "p99": 0.005169999996724073,
              "p995": 0.00647200000094017,
              "p999": 0.013684999998076819
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41510.043963604905,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024090555068473983,
              "min": 0.022902999990037642,
              "max": 2.4244199999957345,
              "p75": 0.023734999995213002,
              "p99": 0.03399399999761954,
              "p995": 0.04031500000564847,
              "p999": 0.04682799999136478
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12480.109191625213,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08012750406631464,
              "min": 0.07830700000340585,
              "max": 0.3759060000011232,
              "p75": 0.07906899999943562,
              "p99": 0.09607099999266211,
              "p995": 0.1024219999962952,
              "p999": 0.20206900000630412
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986320762784938,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3697975000001,
              "min": 1000.0525770000004,
              "max": 1002.308414000001,
              "p75": 1001.756883,
              "p99": 1002.308414000001,
              "p995": 1002.308414000001,
              "p999": 1002.308414000001
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328730858507765,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.1479545999987,
              "min": 3003.4180599999963,
              "max": 3004.5655879999977,
              "p75": 3004.39718,
              "p99": 3004.5655879999977,
              "p995": 3004.5655879999977,
              "p999": 3004.5655879999977
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.142334611640802,
            "unit": "ops/s",
            "extra": {
              "mean": 98.59662871428597,
              "min": 95.05050800000026,
              "max": 100.42947499999718,
              "p75": 99.33175399999891,
              "p99": 100.42947499999718,
              "p995": 100.42947499999718,
              "p999": 100.42947499999718
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2562554.6572215604,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00039023557885170963,
              "min": 0.0003100000000131331,
              "max": 4.466942000000017,
              "p75": 0.0003510000000233049,
              "p99": 0.0008119999999962602,
              "p995": 0.0014529999999695065,
              "p999": 0.002173999999968146
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
        "date": 1751827240716,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4310.616654145797,
            "unit": "ops/s",
            "extra": {
              "mean": 0.23198537012987125,
              "min": 0.16747300000008636,
              "max": 0.7765890000000013,
              "p75": 0.2606869999999617,
              "p99": 0.30937799999998106,
              "p995": 0.40547700000001896,
              "p999": 0.6810710000000313
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9607.936061607115,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1040806260145668,
              "min": 0.07830599999988408,
              "max": 0.353930999999875,
              "p75": 0.11331200000017816,
              "p99": 0.15467899999998735,
              "p995": 0.16160100000001876,
              "p999": 0.315900000000056
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4982.906283990086,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20068609422034828,
              "min": 0.14036200000009558,
              "max": 2.576554999999871,
              "p75": 0.2113339999996242,
              "p99": 0.2593539999998029,
              "p995": 0.28413000000000466,
              "p999": 0.595752000000175
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9211.405680105303,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10856106382978979,
              "min": 0.07687299999997776,
              "max": 0.34270999999989726,
              "p75": 0.11817000000019107,
              "p99": 0.15136299999994662,
              "p995": 0.16031900000007226,
              "p999": 0.27908000000024913
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6836.309353351665,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14627775723895906,
              "min": 0.1381399999999644,
              "max": 0.38265899999998965,
              "p75": 0.1500220000000354,
              "p99": 0.20809199999996508,
              "p995": 0.2591780000000199,
              "p999": 0.34169299999996383
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.267271778377234,
            "unit": "ops/s",
            "extra": {
              "mean": 70.0904851,
              "min": 68.80213799999979,
              "max": 76.22579699999994,
              "p75": 70.390716,
              "p99": 76.22579699999994,
              "p995": 76.22579699999994,
              "p999": 76.22579699999994
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1706.3102034666829,
            "unit": "ops/s",
            "extra": {
              "mean": 0.586059907494145,
              "min": 0.3534050000002935,
              "max": 6.494706999999835,
              "p75": 0.645904999999857,
              "p99": 1.2677550000003066,
              "p995": 1.5113930000002256,
              "p999": 6.494706999999835
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 753.0238672093174,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3279791564986756,
              "min": 0.9906730000000152,
              "max": 5.747180999999955,
              "p75": 1.5069040000000768,
              "p99": 2.652372000000014,
              "p995": 3.561779999999999,
              "p999": 5.747180999999955
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 894463.9212871476,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001117988077776222,
              "min": 0.0010310000000117725,
              "max": 0.25570700000002944,
              "p75": 0.0011219999998957064,
              "p99": 0.001222000000097978,
              "p995": 0.0019929999998566927,
              "p999": 0.009647000000086337
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 483273.9429736963,
            "unit": "ops/s",
            "extra": {
              "mean": 0.002069219775944817,
              "min": 0.0017429999999194479,
              "max": 2.0413429999999835,
              "p75": 0.0018830000000207292,
              "p99": 0.004228000000011889,
              "p995": 0.0044290000000160035,
              "p999": 0.01153199999998833
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1919752.7713406018,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005209004070360997,
              "min": 0.0004999999946448952,
              "max": 0.4266559999960009,
              "p75": 0.0005110000056447461,
              "p99": 0.0005810000002384186,
              "p995": 0.0008410000009462237,
              "p999": 0.0010020000045187771
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1416816.8353800636,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007058075363226103,
              "min": 0.0006609999982174486,
              "max": 0.28926900000078604,
              "p75": 0.0006819999980507419,
              "p99": 0.0008109999907901511,
              "p995": 0.0009009999921545386,
              "p999": 0.0013820000021951273
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 290716.6784015876,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003439775129167612,
              "min": 0.0032770000034361146,
              "max": 0.061214000001200475,
              "p75": 0.003426000002946239,
              "p99": 0.003735999998752959,
              "p995": 0.004457999995793216,
              "p999": 0.012352999998256564
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 295967.88220418314,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033787449927087606,
              "min": 0.003174999998009298,
              "max": 0.19511400000192225,
              "p75": 0.0033260000054724514,
              "p99": 0.0045780000000377186,
              "p995": 0.006230999999388587,
              "p999": 0.014476999996986706
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41627.30948615396,
            "unit": "ops/s",
            "extra": {
              "mean": 0.02402269116942615,
              "min": 0.022901999996975064,
              "max": 2.442957999999635,
              "p75": 0.02360400000179652,
              "p99": 0.0341539999935776,
              "p995": 0.039915000001201406,
              "p999": 0.04685800000152085
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12436.784526484655,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08040663548286602,
              "min": 0.07824600000458304,
              "max": 0.3692790000059176,
              "p75": 0.07901800000399817,
              "p99": 0.101278000001912,
              "p995": 0.15877599999657832,
              "p999": 0.21218600000429433
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986151777919493,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3867426,
              "min": 999.8012459999991,
              "max": 1002.201239,
              "p75": 1001.8314879999998,
              "p99": 1002.201239,
              "p995": 1002.201239,
              "p999": 1002.201239
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328560006419478,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.3021549000014,
              "min": 3002.659154000001,
              "max": 3006.0125899999985,
              "p75": 3004.5626429999975,
              "p99": 3006.0125899999985,
              "p995": 3006.0125899999985,
              "p999": 3006.0125899999985
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.160579363899307,
            "unit": "ops/s",
            "extra": {
              "mean": 98.41958457142859,
              "min": 96.338843000005,
              "max": 100.04997599999479,
              "p75": 99.05799500000285,
              "p99": 100.04997599999479,
              "p995": 100.04997599999479,
              "p999": 100.04997599999479
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2599074.9759641304,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038475227119181074,
              "min": 0.00031100000001060835,
              "max": 1.1565380000000118,
              "p75": 0.0003609999999980573,
              "p99": 0.0006409999999732463,
              "p995": 0.0007820000000151595,
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
          "id": "60cac0ce8c0b869c50ed6a8bf91a0cfd4f1dc94e",
          "message": "chore: prepare for v0.5.4 release\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-06T21:52:06+03:00",
          "tree_id": "0bb4d7856b97c35440f80db2e6b79e5372ea5ca1",
          "url": "https://github.com/carlrannaberg/autoagent/commit/60cac0ce8c0b869c50ed6a8bf91a0cfd4f1dc94e"
        },
        "date": 1751829090353,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4766.456907240833,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2097994421140947,
              "min": 0.15790499999991425,
              "max": 1.0437110000000303,
              "p75": 0.23619200000001683,
              "p99": 0.302265000000034,
              "p995": 0.3560649999999441,
              "p999": 0.6381830000000264
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9877.27186727257,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10124253067422471,
              "min": 0.0695100000000366,
              "max": 0.3292179999999689,
              "p75": 0.11170900000001893,
              "p99": 0.14859799999999268,
              "p995": 0.15205500000001848,
              "p999": 0.2759960000000774
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 5085.682569493947,
            "unit": "ops/s",
            "extra": {
              "mean": 0.19663043973652988,
              "min": 0.1393009999997048,
              "max": 2.838623000000098,
              "p75": 0.21098499999970954,
              "p99": 0.25363400000014735,
              "p995": 0.27044500000010885,
              "p999": 0.5687330000000657
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 11081.758085221103,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09023838927991253,
              "min": 0.07466899999963061,
              "max": 0.493134999999711,
              "p75": 0.0969609999997374,
              "p99": 0.1355039999998553,
              "p995": 0.15245500000037282,
              "p999": 0.28574399999979505
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6841.962040794648,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14615690558316174,
              "min": 0.13819899999998597,
              "max": 0.38666299999999865,
              "p75": 0.14872800000000552,
              "p99": 0.20749799999998686,
              "p995": 0.2583029999999553,
              "p999": 0.36447099999998045
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.438861118137979,
            "unit": "ops/s",
            "extra": {
              "mean": 69.25753990000003,
              "min": 68.37077900000008,
              "max": 70.20256200000006,
              "p75": 69.75097300000004,
              "p99": 70.20256200000006,
              "p995": 70.20256200000006,
              "p999": 70.20256200000006
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1823.8260361773666,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5482979078947364,
              "min": 0.34273099999973056,
              "max": 1.4550199999998767,
              "p75": 0.6313900000000103,
              "p99": 1.17258400000037,
              "p995": 1.2704649999996036,
              "p999": 1.4550199999998767
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 700.0142262435305,
            "unit": "ops/s",
            "extra": {
              "mean": 1.428542396011401,
              "min": 0.9392250000000786,
              "max": 4.8828050000001895,
              "p75": 1.5999500000000353,
              "p99": 2.715995000000021,
              "p995": 4.782136000000037,
              "p999": 4.8828050000001895
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 900928.2738215775,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011099662748491374,
              "min": 0.00102100000003702,
              "max": 0.059621999999990294,
              "p75": 0.0010929999998552375,
              "p99": 0.0020839999999680003,
              "p995": 0.0022639999999682914,
              "p999": 0.00982800000019779
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 513857.80781717575,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019460636479338806,
              "min": 0.0017629999999826396,
              "max": 0.2656479999999988,
              "p75": 0.001902999999970234,
              "p99": 0.003857999999979711,
              "p995": 0.004158000000018092,
              "p999": 0.01238299999999981
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1907957.8931373854,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005241205812753193,
              "min": 0.0004999999946448952,
              "max": 2.8859790000133216,
              "p75": 0.0005110000056447461,
              "p99": 0.000610999995842576,
              "p995": 0.0008410000009462237,
              "p999": 0.001021999996737577
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1413522.5638802124,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007074524493298036,
              "min": 0.0006609999982174486,
              "max": 0.3349329999909969,
              "p75": 0.0006819999980507419,
              "p99": 0.0008420000085607171,
              "p995": 0.0009520000021439046,
              "p999": 0.001352999999653548
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 285870.10125081864,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034980923000499913,
              "min": 0.0032959999953163788,
              "max": 0.028322999998636078,
              "p75": 0.0034769999983836897,
              "p99": 0.003657000001112465,
              "p995": 0.006041000000550412,
              "p999": 0.01272400000016205
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 295740.8223592981,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003381339079341205,
              "min": 0.0031959999978425913,
              "max": 0.12922100000287173,
              "p75": 0.003346000004967209,
              "p99": 0.00407699999777833,
              "p995": 0.0058209999988321215,
              "p999": 0.013505000002624001
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41913.75262508549,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023858517488159658,
              "min": 0.022812000010162592,
              "max": 0.2081179999950109,
              "p75": 0.023593999998411164,
              "p99": 0.03366299999470357,
              "p995": 0.040074999997159466,
              "p999": 0.04659699999319855
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12426.644796794355,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08047224462857146,
              "min": 0.07870700000785291,
              "max": 0.2985269999917364,
              "p75": 0.07941799999389332,
              "p99": 0.09685100000933744,
              "p995": 0.10783199999423232,
              "p999": 0.1906660000095144
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9985489156058288,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.4531931000004,
              "min": 1000.4616409999999,
              "max": 1002.1167839999998,
              "p75": 1001.7213730000003,
              "p99": 1002.1167839999998,
              "p995": 1002.1167839999998,
              "p999": 1002.1167839999998
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3329047321619626,
            "unit": "ops/s",
            "extra": {
              "mean": 3003.862376799999,
              "min": 3002.5602759999965,
              "max": 3004.393788000001,
              "p75": 3004.332180999998,
              "p99": 3004.393788000001,
              "p995": 3004.393788000001,
              "p999": 3004.393788000001
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.162071205634959,
            "unit": "ops/s",
            "extra": {
              "mean": 98.40513609523727,
              "min": 96.17974099999992,
              "max": 99.7816610000009,
              "p75": 99.00892800000292,
              "p99": 99.7816610000009,
              "p995": 99.7816610000009,
              "p999": 99.7816610000009
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2649299.2370017543,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000377458305212707,
              "min": 0.00029999999998153726,
              "max": 1.127377000000024,
              "p75": 0.0003510000000233049,
              "p99": 0.0007419999999456195,
              "p995": 0.0013829999999188658,
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
          "id": "d219b17019983c883809d7f6b7e0d451fa281197",
          "message": "feat: Add Claude Code configuration with development hooks\n\n- Add post-tool-use hooks for automatic validation\n- Configure full checks on file modifications\n- Set up automatic test running for TypeScript changes\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-06T23:12:23+03:00",
          "tree_id": "5460b9fc21d51ca39161be01871f49f17ba6208d",
          "url": "https://github.com/carlrannaberg/autoagent/commit/d219b17019983c883809d7f6b7e0d451fa281197"
        },
        "date": 1751833171343,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4852.815835291106,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20606592830655257,
              "min": 0.1550879999999779,
              "max": 1.0352719999999636,
              "p75": 0.21833600000002207,
              "p99": 0.29594900000000735,
              "p995": 0.4002530000000206,
              "p999": 0.7102090000000771
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 8795.258049621441,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11369763051387005,
              "min": 0.080600000000004,
              "max": 0.38145099999997,
              "p75": 0.13049200000000383,
              "p99": 0.15543900000000122,
              "p995": 0.16573799999991934,
              "p999": 0.3618819999999232
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4777.495226575563,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2093147041649239,
              "min": 0.14100199999984397,
              "max": 3.006355999999869,
              "p75": 0.23220100000025923,
              "p99": 0.2699410000000171,
              "p995": 0.29499699999996665,
              "p999": 0.6936080000000402
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9338.34403145233,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10708536723769393,
              "min": 0.07728399999996327,
              "max": 0.5271789999997054,
              "p75": 0.1157549999998082,
              "p99": 0.14618100000006962,
              "p995": 0.1586040000001958,
              "p999": 0.3697860000002038
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6659.407166255289,
            "unit": "ops/s",
            "extra": {
              "mean": 0.15016351681681583,
              "min": 0.1397789999999759,
              "max": 0.4910509999999704,
              "p75": 0.1524330000000873,
              "p99": 0.28688300000004574,
              "p995": 0.3195630000000165,
              "p999": 0.3911959999999226
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.280369959259673,
            "unit": "ops/s",
            "extra": {
              "mean": 70.02619700000001,
              "min": 69.36139800000001,
              "max": 71.05013000000008,
              "p75": 70.29036200000007,
              "p99": 71.05013000000008,
              "p995": 71.05013000000008,
              "p999": 71.05013000000008
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1951.695324961946,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5123750552712412,
              "min": 0.34723399999984395,
              "max": 1.3513800000000629,
              "p75": 0.6011960000000727,
              "p99": 1.2019620000000941,
              "p995": 1.303570000000036,
              "p999": 1.3513800000000629
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 722.0488579146796,
            "unit": "ops/s",
            "extra": {
              "mean": 1.384947831491708,
              "min": 0.9499539999999342,
              "max": 4.328097000000071,
              "p75": 1.5913649999999961,
              "p99": 2.4905140000000756,
              "p995": 2.9251489999999194,
              "p999": 4.328097000000071
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 894531.5473672581,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011179035585085306,
              "min": 0.00102100000003702,
              "max": 0.42249599999991005,
              "p75": 0.0011030000000573636,
              "p99": 0.001904000000195083,
              "p995": 0.0021240000000943837,
              "p999": 0.009878000000071552
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 495712.23427302577,
            "unit": "ops/s",
            "extra": {
              "mean": 0.002017299414581778,
              "min": 0.0017730000000142354,
              "max": 1.1739699999999402,
              "p75": 0.0019039999999677093,
              "p99": 0.004047999999897911,
              "p995": 0.004258000000049833,
              "p999": 0.011481000000003405
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1904993.4894428877,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005249361772320011,
              "min": 0.0004999999946448952,
              "max": 0.4384229999996023,
              "p75": 0.0005110000056447461,
              "p99": 0.0005910000036237761,
              "p995": 0.0008510000043315813,
              "p999": 0.0010519999923417345
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1412127.511414134,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007081513474647761,
              "min": 0.0006609999982174486,
              "max": 0.3535259999916889,
              "p75": 0.0006819999980507419,
              "p99": 0.0008110000053420663,
              "p995": 0.0009109999955398962,
              "p999": 0.0014430000010179356
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 284792.7765304685,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003511325013866759,
              "min": 0.0033159999948111363,
              "max": 0.3843730000007781,
              "p75": 0.003466000001935754,
              "p99": 0.0053299999999580905,
              "p995": 0.006150999994133599,
              "p999": 0.012493000001995824
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 290252.757718203,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003445273036719491,
              "min": 0.0032260000007227063,
              "max": 0.19998100000520935,
              "p75": 0.003396000000066124,
              "p99": 0.00513900000078138,
              "p995": 0.006431000001612119,
              "p999": 0.014045999996596947
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42235.070828362,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023677005398283192,
              "min": 0.022601999997277744,
              "max": 2.3255449999996927,
              "p75": 0.02327299999888055,
              "p99": 0.034113000001525506,
              "p995": 0.03980500000761822,
              "p999": 0.04548400000203401
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12483.290024821943,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0801070869948216,
              "min": 0.07821500000136439,
              "max": 0.3537769999966258,
              "p75": 0.07903699998860247,
              "p99": 0.09115900000324473,
              "p995": 0.10323200000857469,
              "p999": 0.27685399999609217
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9988279064154869,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.1734689999996,
              "min": 999.869741999999,
              "max": 1002.1502909999999,
              "p75": 1001.8075249999983,
              "p99": 1002.1502909999999,
              "p995": 1002.1502909999999,
              "p999": 1002.1502909999999
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328939966587864,
            "unit": "ops/s",
            "extra": {
              "mean": 3003.9592484,
              "min": 3003.2035380000016,
              "max": 3004.566801000001,
              "p75": 3004.4713059999995,
              "p99": 3004.566801000001,
              "p995": 3004.566801000001,
              "p999": 3004.566801000001
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.139368522127183,
            "unit": "ops/s",
            "extra": {
              "mean": 98.62547138095397,
              "min": 96.54025200000615,
              "max": 99.92146800000046,
              "p75": 99.20577899999626,
              "p99": 99.92146800000046,
              "p995": 99.92146800000046,
              "p999": 99.92146800000046
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2439771.7413842953,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0004098744087562113,
              "min": 0.0003400000000510772,
              "max": 1.2623729999999682,
              "p75": 0.000381000000061249,
              "p99": 0.0007410000000049877,
              "p995": 0.0008809999999357387,
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
          "id": "b1884255d2c19403e9531c9c1c600ca5e96155ae",
          "message": "fix: Fix autonomous-agent test timeouts and improve test reliability\n\n- Add proper git command mock implementations in execMock setup\n- Fix import path in in-memory-config-manager test helper\n- Add timeout protection to promisified exec mock\n- Fix test expectations to use includes() instead of exact matches\n- Add proper cleanup for event listeners in git validation tests\n- Replace deprecated fail() with expect.fail() for better error handling\n\nAll 43 autonomous-agent tests now pass reliably, ensuring core functionality works correctly.\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-07T00:40:15+03:00",
          "tree_id": "13bdbd78c16dc34587336993ffee0a4c1d25ba03",
          "url": "https://github.com/carlrannaberg/autoagent/commit/b1884255d2c19403e9531c9c1c600ca5e96155ae"
        },
        "date": 1751838644794,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4231.937409645744,
            "unit": "ops/s",
            "extra": {
              "mean": 0.23629839083175622,
              "min": 0.1624730000000909,
              "max": 0.8509159999999838,
              "p75": 0.2720970000000307,
              "p99": 0.32992400000000544,
              "p995": 0.4988389999999754,
              "p999": 0.7574910000000159
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9395.524887097443,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10643364921243158,
              "min": 0.08159200000000055,
              "max": 2.5799259999998867,
              "p75": 0.11506400000007488,
              "p99": 0.15584999999987303,
              "p995": 0.16233299999998962,
              "p999": 0.3952070000000276
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4806.650597358088,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20804507832327918,
              "min": 0.14222500000005311,
              "max": 0.9167869999998857,
              "p75": 0.22012999999992644,
              "p99": 0.27738700000008976,
              "p995": 0.3028749999998581,
              "p999": 0.6814399999998386
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 8970.870603274469,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11147190102541316,
              "min": 0.078907000000072,
              "max": 0.4746549999999843,
              "p75": 0.11741900000015448,
              "p99": 0.15262399999983245,
              "p995": 0.15622099999973216,
              "p999": 0.3728350000001228
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6532.638663428946,
            "unit": "ops/s",
            "extra": {
              "mean": 0.15307750076522764,
              "min": 0.13930600000003324,
              "max": 0.43992900000000645,
              "p75": 0.15461400000003778,
              "p99": 0.2435369999999466,
              "p995": 0.3000610000000279,
              "p999": 0.37760400000001937
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 13.83848610493594,
            "unit": "ops/s",
            "extra": {
              "mean": 72.26223969999998,
              "min": 69.99001499999997,
              "max": 82.23883999999998,
              "p75": 72.11034499999994,
              "p99": 82.23883999999998,
              "p995": 82.23883999999998,
              "p999": 82.23883999999998
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1914.8094219932866,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5222451845672536,
              "min": 0.3496310000000449,
              "max": 2.0912169999996877,
              "p75": 0.6182220000000598,
              "p99": 1.1984150000002955,
              "p995": 1.3081670000001395,
              "p999": 2.0912169999996877
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 723.4282977659842,
            "unit": "ops/s",
            "extra": {
              "mean": 1.382306999999994,
              "min": 1.0290079999999762,
              "max": 7.138953000000129,
              "p75": 1.5952729999999065,
              "p99": 2.8986540000000787,
              "p995": 4.412372000000232,
              "p999": 7.138953000000129
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 855398.8965354837,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001169045230301531,
              "min": 0.0010310000000117725,
              "max": 0.3319779999999355,
              "p75": 0.0011730000001080043,
              "p99": 0.0012629999998807762,
              "p995": 0.001874000000043452,
              "p999": 0.009919000000081724
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 508115.0528735247,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001968058207181102,
              "min": 0.0017530000000078871,
              "max": 0.28314799999998286,
              "p75": 0.0019239999999740576,
              "p99": 0.003546000000028471,
              "p995": 0.0036670000000640357,
              "p999": 0.01192300000002433
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1936190.6795570957,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005164780569177982,
              "min": 0.0004899999912595376,
              "max": 0.49641600000904873,
              "p75": 0.0005010000022593886,
              "p99": 0.0005909999890718609,
              "p995": 0.0008309999975608662,
              "p999": 0.0012319999950705096
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1405247.7077121814,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000711618310787394,
              "min": 0.0006609999982174486,
              "max": 0.6107079999928828,
              "p75": 0.0006819999980507419,
              "p99": 0.0009220000065397471,
              "p995": 0.0010020000045187771,
              "p999": 0.002665000007255003
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 288659.3695675848,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034642908057965064,
              "min": 0.003246000000217464,
              "max": 0.05707800000527641,
              "p75": 0.0034559999985503964,
              "p99": 0.0037969999975757673,
              "p995": 0.0056910000057541765,
              "p999": 0.012434000003850088
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 286939.8783378095,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034850506168498364,
              "min": 0.003246000000217464,
              "max": 0.24132899999676738,
              "p75": 0.003426000002946239,
              "p99": 0.005239999998593703,
              "p995": 0.006442000005336013,
              "p999": 0.014156999997794628
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41624.800956138024,
            "unit": "ops/s",
            "extra": {
              "mean": 0.02402413890348079,
              "min": 0.022872000001370907,
              "max": 2.4930659999954514,
              "p75": 0.023574000006192364,
              "p99": 0.03516499999386724,
              "p995": 0.03974400000879541,
              "p999": 0.05110599999898113
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12396.718290765295,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0806665100024844,
              "min": 0.07824599999003112,
              "max": 0.42775699999765493,
              "p75": 0.07927800000470597,
              "p99": 0.10123799998837058,
              "p995": 0.1303429999970831,
              "p999": 0.290130000008503
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9985566293302384,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.4454569999998,
              "min": 999.982626,
              "max": 1002.0527529999999,
              "p75": 1001.8748780000005,
              "p99": 1002.0527529999999,
              "p995": 1002.0527529999999,
              "p999": 1002.0527529999999
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33287418975526206,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.137992,
              "min": 3002.6784659999976,
              "max": 3004.5576710000023,
              "p75": 3004.5070229999983,
              "p99": 3004.5576710000023,
              "p995": 3004.5576710000023,
              "p999": 3004.5576710000023
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.116613056975796,
            "unit": "ops/s",
            "extra": {
              "mean": 98.84731128571349,
              "min": 97.76225899999554,
              "max": 99.95934700000362,
              "p75": 99.30136599999969,
              "p99": 99.95934700000362,
              "p995": 99.95934700000362,
              "p999": 99.95934700000362
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2622041.711576011,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038138218609761837,
              "min": 0.00030999999989944627,
              "max": 4.654154000000062,
              "p75": 0.0003499999999121428,
              "p99": 0.0008009999999671891,
              "p995": 0.0013030000000071595,
              "p999": 0.002134000000069136
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
        "date": 1751897358159,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4515.869428151322,
            "unit": "ops/s",
            "extra": {
              "mean": 0.22144130070859327,
              "min": 0.15799500000002809,
              "max": 1.2983699999999772,
              "p75": 0.23717199999998684,
              "p99": 0.3030150000000731,
              "p995": 0.37293499999998403,
              "p999": 0.7074080000000436
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 8271.89130734805,
            "unit": "ops/s",
            "extra": {
              "mean": 0.12089133704062144,
              "min": 0.0845679999999902,
              "max": 0.3742369999999937,
              "p75": 0.13360899999997855,
              "p99": 0.16284399999995003,
              "p995": 0.1794640000000527,
              "p999": 0.3385510000000522
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4732.177821503476,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2113191933438982,
              "min": 0.14504000000033557,
              "max": 2.9344209999999293,
              "p75": 0.22382700000002842,
              "p99": 0.2753139999999803,
              "p995": 0.29576200000019526,
              "p999": 0.6699400000002242
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9406.275058467372,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10631200914115484,
              "min": 0.07908799999950133,
              "max": 0.34940099999994345,
              "p75": 0.11462399999982154,
              "p99": 0.15399699999989025,
              "p995": 0.16225200000008044,
              "p999": 0.3223110000003544
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6009.487222474271,
            "unit": "ops/s",
            "extra": {
              "mean": 0.16640354875208013,
              "min": 0.1401810000000978,
              "max": 0.6417059999999992,
              "p75": 0.15869600000007722,
              "p99": 0.2836979999999585,
              "p995": 0.2927949999999555,
              "p999": 0.45588199999997414
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.100243927310826,
            "unit": "ops/s",
            "extra": {
              "mean": 70.92075889999998,
              "min": 69.94610999999998,
              "max": 72.77169299999991,
              "p75": 71.10825299999999,
              "p99": 72.77169299999991,
              "p995": 72.77169299999991,
              "p999": 72.77169299999991
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1944.350972607917,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5143104378211724,
              "min": 0.3728249999999207,
              "max": 1.4621650000003683,
              "p75": 0.6122610000002169,
              "p99": 1.165871000000152,
              "p995": 1.3411189999997077,
              "p999": 1.4621650000003683
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 713.789958739157,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4009723557423057,
              "min": 0.915025999999898,
              "max": 3.70613800000001,
              "p75": 1.6127559999999903,
              "p99": 2.794759000000113,
              "p995": 3.6026879999999437,
              "p999": 3.70613800000001
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 897800.0086795279,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011138338052266077,
              "min": 0.001040999999986525,
              "max": 0.3509639999999763,
              "p75": 0.001111999999920954,
              "p99": 0.0012030000000322616,
              "p995": 0.001592999999957101,
              "p999": 0.009778000000096654
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 490781.9911659331,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0020375645765329247,
              "min": 0.0018830000000207292,
              "max": 0.26893100000000913,
              "p75": 0.0019940000000815417,
              "p99": 0.0028550000000677755,
              "p995": 0.003957000000013977,
              "p999": 0.013424999999983811
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1933800.773960242,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005171163511079242,
              "min": 0.0004899999912595376,
              "max": 2.8217469999945024,
              "p75": 0.0005010000022593886,
              "p99": 0.000582000007852912,
              "p995": 0.000822000001790002,
              "p999": 0.0010020000045187771
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1396518.3884255053,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007160664752344886,
              "min": 0.0006709999870508909,
              "max": 0.2979150000028312,
              "p75": 0.0006920000014360994,
              "p99": 0.0009220000065397471,
              "p995": 0.001001999989966862,
              "p999": 0.0015330000023823231
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 288449.29896067706,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003466813764509531,
              "min": 0.0032260000007227063,
              "max": 0.35441800000262447,
              "p75": 0.003456999998888932,
              "p99": 0.003816999997070525,
              "p995": 0.005881000004592352,
              "p999": 0.012704000000667293
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 287468.12685731065,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034786465231199906,
              "min": 0.003205999993951991,
              "max": 0.15725299999758136,
              "p75": 0.003386000003956724,
              "p99": 0.005971000005956739,
              "p995": 0.008325000002514571,
              "p999": 0.015297999998438172
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 40591.709769253095,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024635572280265652,
              "min": 0.023203999997349456,
              "max": 2.3898079999926267,
              "p75": 0.024254999996628612,
              "p99": 0.03665799999726005,
              "p995": 0.03995400000712834,
              "p999": 0.046786999999312684
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12360.184184926982,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08090494324667764,
              "min": 0.07884700001159217,
              "max": 0.42056400000001304,
              "p75": 0.07984900000155903,
              "p99": 0.09249199999612756,
              "p995": 0.10121900000376627,
              "p999": 0.27880000000004657
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9985668959347768,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.4351608,
              "min": 999.8742699999984,
              "max": 1002.2112319999997,
              "p75": 1001.882246000001,
              "p99": 1002.2112319999997,
              "p995": 1002.2112319999997,
              "p999": 1002.2112319999997
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328418317028528,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.4300468000006,
              "min": 3003.6593980000034,
              "max": 3005.047182000002,
              "p75": 3004.8404789999986,
              "p99": 3005.047182000002,
              "p995": 3005.047182000002,
              "p999": 3005.047182000002
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.149331022069614,
            "unit": "ops/s",
            "extra": {
              "mean": 98.52866142857204,
              "min": 94.70407899999555,
              "max": 99.8621920000005,
              "p75": 99.45783800000208,
              "p99": 99.8621920000005,
              "p995": 99.8621920000005,
              "p999": 99.8621920000005
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2582367.3027607263,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038724158214477545,
              "min": 0.00030999999989944627,
              "max": 4.178878999999938,
              "p75": 0.0003510000000233049,
              "p99": 0.0008010000000240325,
              "p995": 0.0014519999999720312,
              "p999": 0.002173999999968146
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
        "date": 1752007974925,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4419.053482934469,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2262928031674219,
              "min": 0.17187000000001262,
              "max": 0.7866089999999986,
              "p75": 0.2512980000000198,
              "p99": 0.2969829999999547,
              "p995": 0.3564230000000066,
              "p999": 0.6843240000000606
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9115.630999257266,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10970167617375903,
              "min": 0.07925799999998162,
              "max": 0.35189600000001064,
              "p75": 0.12981200000012905,
              "p99": 0.15185300000007373,
              "p995": 0.15859500000010485,
              "p999": 0.28142399999978807
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4785.445223401231,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20896697241667622,
              "min": 0.13893899999993664,
              "max": 2.6583909999999378,
              "p75": 0.2292170000000624,
              "p99": 0.2816450000000259,
              "p995": 0.3224099999997634,
              "p999": 0.6029229999999188
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10913.650588562537,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09162836870075317,
              "min": 0.07448900000008507,
              "max": 0.31380499999977474,
              "p75": 0.09583799999973053,
              "p99": 0.1307040000001507,
              "p995": 0.14270600000008926,
              "p999": 0.2631900000001224
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6848.050880366211,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14602695240875946,
              "min": 0.13569600000005266,
              "max": 0.47254900000007183,
              "p75": 0.1489010000000235,
              "p99": 0.24740600000006907,
              "p995": 0.26632199999994555,
              "p999": 0.3458010000000513
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.455204219070524,
            "unit": "ops/s",
            "extra": {
              "mean": 69.1792371,
              "min": 68.49606700000004,
              "max": 69.75596300000007,
              "p75": 69.6182,
              "p99": 69.75596300000007,
              "p995": 69.75596300000007,
              "p999": 69.75596300000007
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1783.769347920708,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5606105975336291,
              "min": 0.3385570000000371,
              "max": 1.4388309999999365,
              "p75": 0.625470999999834,
              "p99": 1.2350109999997585,
              "p995": 1.3137090000000171,
              "p999": 1.4388309999999365
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 666.5489202708898,
            "unit": "ops/s",
            "extra": {
              "mean": 1.5002649761904852,
              "min": 0.8865089999999327,
              "max": 5.023454999999785,
              "p75": 1.5921780000001036,
              "p99": 2.9096779999999853,
              "p995": 3.6801880000000438,
              "p999": 5.023454999999785
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 908850.1041385145,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011002914511935773,
              "min": 0.0010219999999208085,
              "max": 0.18073600000002443,
              "p75": 0.0011019999999462016,
              "p99": 0.0012030000000322616,
              "p995": 0.002103999999917505,
              "p999": 0.00969800000007126
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 521139.36108316446,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019188725217790985,
              "min": 0.0017629999999826396,
              "max": 1.2633329999999887,
              "p75": 0.0018830000000207292,
              "p99": 0.003496000000041022,
              "p995": 0.0036269999999376523,
              "p999": 0.011228999999957523
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1906817.5499785303,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005244340235966778,
              "min": 0.0004999999946448952,
              "max": 2.666396000000532,
              "p75": 0.0005110000056447461,
              "p99": 0.0005810000002384186,
              "p995": 0.0008410000009462237,
              "p999": 0.0010119999933522195
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1397435.3907340283,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007155965897462579,
              "min": 0.0006709999870508909,
              "max": 3.177477999997791,
              "p75": 0.0006820000126026571,
              "p99": 0.000941999998758547,
              "p995": 0.0010009999969042838,
              "p999": 0.0014830000000074506
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 282903.8704302758,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003534769596750565,
              "min": 0.0033059999987017363,
              "max": 0.027631999997538514,
              "p75": 0.0035260000004200265,
              "p99": 0.0037169999995967373,
              "p995": 0.006562000002304558,
              "p999": 0.01231299999926705
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 286509.3026362464,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034902880667354976,
              "min": 0.0032359999968321063,
              "max": 0.13763599999947473,
              "p75": 0.0034470000027795322,
              "p99": 0.00520900000265101,
              "p995": 0.006290999997872859,
              "p999": 0.013245000001916196
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 39703.48520467518,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0251867057726773,
              "min": 0.02363399999740068,
              "max": 3.8611800000071526,
              "p75": 0.02455599998938851,
              "p99": 0.039552999995066784,
              "p995": 0.0452250000089407,
              "p999": 0.06327799998689443
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12393.365036253792,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08068833582120287,
              "min": 0.07897699999739416,
              "max": 0.32875200000125915,
              "p75": 0.07967900000221562,
              "p99": 0.09227199999440927,
              "p995": 0.10121799999615178,
              "p999": 0.19988200000079814
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9985237191273859,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.4784635,
              "min": 1000.752673,
              "max": 1001.9045040000001,
              "p75": 1001.8107479999999,
              "p99": 1001.9045040000001,
              "p995": 1001.9045040000001,
              "p999": 1001.9045040000001
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328881738846979,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.0117926999983,
              "min": 3003.2215329999963,
              "max": 3004.496471999999,
              "p75": 3004.411804000003,
              "p99": 3004.496471999999,
              "p995": 3004.496471999999,
              "p999": 3004.496471999999
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.156302943885349,
            "unit": "ops/s",
            "extra": {
              "mean": 98.46102519047591,
              "min": 96.70961399999942,
              "max": 99.68750399999408,
              "p75": 98.71355200000107,
              "p99": 99.68750399999408,
              "p995": 99.68750399999408,
              "p999": 99.68750399999408
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2657902.8305229354,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003762364780669023,
              "min": 0.0003100000000131331,
              "max": 4.155949999999962,
              "p75": 0.0003510000000233049,
              "p99": 0.0006810000000427863,
              "p995": 0.0009820000000217988,
              "p999": 0.002003000000058819
            }
          }
        ]
      }
    ]
  }
}