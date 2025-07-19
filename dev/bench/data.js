window.BENCHMARK_DATA = {
  "lastUpdate": 1752958244716,
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
        "date": 1752009375712,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4280.414200707726,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2336222508173764,
              "min": 0.17405599999995047,
              "max": 0.9554180000000088,
              "p75": 0.24947700000001305,
              "p99": 0.3074549999998908,
              "p995": 0.34692900000004556,
              "p999": 0.684880000000021
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 8645.17927855025,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11567140111034165,
              "min": 0.07936900000004243,
              "max": 0.4346540000000232,
              "p75": 0.12921099999994112,
              "p99": 0.15453999999999724,
              "p995": 0.16106200000012905,
              "p999": 0.29733699999997043
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4653.7894881593775,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21487864944134172,
              "min": 0.14133400000037,
              "max": 3.0972690000000966,
              "p75": 0.23357799999985218,
              "p99": 0.2729300000000876,
              "p995": 0.3426920000001701,
              "p999": 0.6785300000001371
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10097.10699166357,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0990382691622091,
              "min": 0.07595199999968827,
              "max": 0.4015119999999115,
              "p75": 0.10338400000000547,
              "p99": 0.14145499999995081,
              "p995": 0.16309599999976854,
              "p999": 0.3247479999999996
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6723.823661000638,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14872489976204703,
              "min": 0.14163600000006227,
              "max": 0.38881900000001224,
              "p75": 0.14810699999998178,
              "p99": 0.2100229999999783,
              "p995": 0.27242999999998574,
              "p999": 0.3729979999999955
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.310942883369743,
            "unit": "ops/s",
            "extra": {
              "mean": 69.87659780000001,
              "min": 68.57812000000013,
              "max": 75.343435,
              "p75": 69.83003300000007,
              "p99": 75.343435,
              "p995": 75.343435,
              "p999": 75.343435
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1787.3175949929669,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5594976532438461,
              "min": 0.34519700000009834,
              "max": 1.7403180000001157,
              "p75": 0.6348780000002989,
              "p99": 1.3274959999998828,
              "p995": 1.4135160000000724,
              "p999": 1.7403180000001157
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 711.8380440319016,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4048139297752735,
              "min": 0.9347300000001724,
              "max": 6.619841999999835,
              "p75": 1.594335000000001,
              "p99": 2.363354000000072,
              "p995": 3.3211160000000746,
              "p999": 6.619841999999835
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 845203.4201905142,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011831471289770617,
              "min": 0.0010919999999714491,
              "max": 0.5013260000000628,
              "p75": 0.0011830000000827567,
              "p99": 0.0012530000001333974,
              "p995": 0.0012820000001738663,
              "p999": 0.009767999999894528
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 507151.9168270854,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001971795761428527,
              "min": 0.0017929999999068968,
              "max": 0.23576200000002245,
              "p75": 0.0019129999999449865,
              "p99": 0.0036370000000260916,
              "p995": 0.0038569999999822357,
              "p999": 0.01199199999996381
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1898255.8860826755,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000526799367425455,
              "min": 0.0004999999946448952,
              "max": 2.8524389999947743,
              "p75": 0.0005110000056447461,
              "p99": 0.0005720000044675544,
              "p995": 0.0007920000061858445,
              "p999": 0.0010209999891230837
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1407940.738504094,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007102571668339379,
              "min": 0.0006709999870508909,
              "max": 0.27572500001406297,
              "p75": 0.0006819999980507419,
              "p99": 0.0009310000023106113,
              "p995": 0.0009909999935189262,
              "p999": 0.0014820000069448724
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 292941.5629299446,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003413650115054328,
              "min": 0.0032260000007227063,
              "max": 0.03163900000072317,
              "p75": 0.0033970000004046597,
              "p99": 0.0036670000044978224,
              "p995": 0.006001000001560897,
              "p999": 0.01273399999627145
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 296068.8251988141,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033775930286766495,
              "min": 0.0031750000052852556,
              "max": 0.15968900000007125,
              "p75": 0.003337000001920387,
              "p99": 0.005079999995359685,
              "p995": 0.006000999994284939,
              "p999": 0.013285000000905711
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42902.42959949968,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023308703244434945,
              "min": 0.02240200000233017,
              "max": 2.3822979999968084,
              "p75": 0.02284200000576675,
              "p99": 0.03374400000029709,
              "p995": 0.040416000003460795,
              "p999": 0.04567500000121072
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12445.367189258424,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08035118488613967,
              "min": 0.07843599999614526,
              "max": 0.369672000000719,
              "p75": 0.07933799999591429,
              "p99": 0.09190200000011828,
              "p995": 0.10031799999705981,
              "p999": 0.23556099999404978
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9987845395419634,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.2169396000002,
              "min": 1000.0652080000009,
              "max": 1002.1322330000003,
              "p75": 1001.775963,
              "p99": 1002.1322330000003,
              "p995": 1002.1322330000003,
              "p999": 1002.1322330000003
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328990229037967,
            "unit": "ops/s",
            "extra": {
              "mean": 3003.913893400001,
              "min": 3002.900170000001,
              "max": 3004.6795310000016,
              "p75": 3004.473253999997,
              "p99": 3004.6795310000016,
              "p995": 3004.6795310000016,
              "p999": 3004.6795310000016
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.174904678186156,
            "unit": "ops/s",
            "extra": {
              "mean": 98.28101899999976,
              "min": 95.01387500000419,
              "max": 99.84226399999898,
              "p75": 99.10708600000362,
              "p99": 99.84226399999898,
              "p995": 99.84226399999898,
              "p999": 99.84226399999898
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2661964.3016665857,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003756624382129867,
              "min": 0.00031099999995376493,
              "max": 4.128903000000037,
              "p75": 0.00035099999990961805,
              "p99": 0.0007209999999986394,
              "p995": 0.0009420000000091022,
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
          "id": "4ebacf76a3be7d4a998178cb58fafcd8b0b180d7",
          "message": "chore: prepare for v0.6.2 release",
          "timestamp": "2025-07-09T11:12:58+03:00",
          "tree_id": "bd977da68202ab7d918c896ebfd1ab5b27d15765",
          "url": "https://github.com/carlrannaberg/autoagent/commit/4ebacf76a3be7d4a998178cb58fafcd8b0b180d7"
        },
        "date": 1752061976406,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4671.434541534492,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2140670047089038,
              "min": 0.15020099999992453,
              "max": 1.1051919999999882,
              "p75": 0.22441000000003442,
              "p99": 0.30845799999997325,
              "p995": 0.43784100000004855,
              "p999": 0.7582310000000234
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9636.18718265007,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10377548516289693,
              "min": 0.07617200000004232,
              "max": 0.39059199999996963,
              "p75": 0.11128900000016984,
              "p99": 0.14771700000005694,
              "p995": 0.1548809999999321,
              "p999": 0.3262019999999666
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4837.9064929433,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20670097726333214,
              "min": 0.14415999999982887,
              "max": 2.7627890000001116,
              "p75": 0.22018300000036106,
              "p99": 0.27162900000030277,
              "p995": 0.2984190000001945,
              "p999": 0.6889620000001742
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10139.228789980256,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09862683057198746,
              "min": 0.07480000000032305,
              "max": 0.4104389999997693,
              "p75": 0.10367500000029395,
              "p99": 0.1467649999999594,
              "p995": 0.15462600000000748,
              "p999": 0.356619000000137
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6794.348280344346,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14718115097115964,
              "min": 0.13769800000000032,
              "max": 0.4237920000000486,
              "p75": 0.14856799999995474,
              "p99": 0.25342299999999796,
              "p995": 0.30869700000005196,
              "p999": 0.40288299999997434
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.211570007507003,
            "unit": "ops/s",
            "extra": {
              "mean": 70.36520240000002,
              "min": 69.52024200000005,
              "max": 71.10161700000003,
              "p75": 70.72955100000001,
              "p99": 71.10161700000003,
              "p995": 71.10161700000003,
              "p999": 71.10161700000003
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1707.3975481898815,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5856866791569206,
              "min": 0.3504969999999048,
              "max": 2.404432999999699,
              "p75": 0.6490459999999985,
              "p99": 1.4144059999998717,
              "p995": 1.5489440000001196,
              "p999": 2.404432999999699
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 703.7575890437282,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4209438243626027,
              "min": 1.0233129999999164,
              "max": 3.723064000000022,
              "p75": 1.608929999999873,
              "p99": 2.5419349999999667,
              "p995": 2.993938999999955,
              "p999": 3.723064000000022
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 922822.1838859682,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0010836323806055887,
              "min": 0.00102100000003702,
              "max": 0.3598250000000007,
              "p75": 0.0010819999999966967,
              "p99": 0.001142000000072585,
              "p995": 0.0013120000000981236,
              "p999": 0.009758000000147149
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 526279.4210926364,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019001312989283287,
              "min": 0.0017429999999194479,
              "max": 1.2087960000000066,
              "p75": 0.001824000000056003,
              "p99": 0.003716999999937798,
              "p995": 0.00405799999998635,
              "p999": 0.01163200000002007
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1914053.6477679964,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005224513958457295,
              "min": 0.0004999999946448952,
              "max": 0.40465900000708643,
              "p75": 0.0005110000056447461,
              "p99": 0.0006209999992279336,
              "p995": 0.0008510000043315813,
              "p999": 0.0010220000112894922
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1405859.03277054,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007113088700147199,
              "min": 0.0006709999870508909,
              "max": 0.2169970000104513,
              "p75": 0.0006819999980507419,
              "p99": 0.0009209999989252537,
              "p995": 0.0010009999969042838,
              "p999": 0.0015030000067781657
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 288456.40425910155,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003466728369468841,
              "min": 0.0032659999997122213,
              "max": 0.05668500000319909,
              "p75": 0.003426000002946239,
              "p99": 0.00535900000249967,
              "p995": 0.007274000003235415,
              "p999": 0.012884999996458646
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 293359.6385808712,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034087852195261257,
              "min": 0.003206000001227949,
              "max": 0.17641100000037113,
              "p75": 0.0033570000014151447,
              "p99": 0.005010000000766013,
              "p995": 0.006432000001950655,
              "p999": 0.013915999996243045
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42609.85972839101,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023468746585281492,
              "min": 0.02258199999050703,
              "max": 0.33844399999361485,
              "p75": 0.023142999998526648,
              "p99": 0.03364300000248477,
              "p995": 0.040435999995679595,
              "p999": 0.046977999998489395
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12371.98875387138,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08082774886835273,
              "min": 0.07835700000578072,
              "max": 0.48047999999835156,
              "p75": 0.07931899999675807,
              "p99": 0.10527699999511242,
              "p995": 0.16359699999156874,
              "p999": 0.2599179999961052
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986185629083758,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3833481000001,
              "min": 1000.0582109999996,
              "max": 1002.204232,
              "p75": 1001.7786130000004,
              "p99": 1002.204232,
              "p995": 1002.204232,
              "p999": 1002.204232
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33287911902090306,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.093506800002,
              "min": 3002.563857000001,
              "max": 3004.5464000000065,
              "p75": 3004.453951000003,
              "p99": 3004.5464000000065,
              "p995": 3004.5464000000065,
              "p999": 3004.5464000000065
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.189411444854244,
            "unit": "ops/s",
            "extra": {
              "mean": 98.14109533333352,
              "min": 93.89303400000063,
              "max": 99.81796600000234,
              "p75": 99.09923299999355,
              "p99": 99.81796600000234,
              "p995": 99.81796600000234,
              "p999": 99.81796600000234
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2610166.043050366,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003831173892797072,
              "min": 0.0003100000000131331,
              "max": 4.313224999999875,
              "p75": 0.0003600000000005821,
              "p99": 0.0007010000000491345,
              "p995": 0.0008710000000746732,
              "p999": 0.001573000000007596
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
        "date": 1752169553162,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4231.4742647114845,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2363242542533065,
              "min": 0.17301500000007763,
              "max": 2.0432739999999967,
              "p75": 0.2580639999999903,
              "p99": 0.3261420000000044,
              "p995": 0.7019470000000183,
              "p999": 1.290363999999954
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 8872.975685940806,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11270176267748551,
              "min": 0.07699499999989712,
              "max": 0.471815000000106,
              "p75": 0.12657800000010866,
              "p99": 0.15321700000004057,
              "p995": 0.16276599999991959,
              "p999": 0.3529320000000098
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 5093.019239355894,
            "unit": "ops/s",
            "extra": {
              "mean": 0.19634718680671398,
              "min": 0.1385299999997187,
              "max": 2.7432840000001306,
              "p75": 0.2026499999999487,
              "p99": 0.2518119999999726,
              "p995": 0.28147900000021764,
              "p999": 0.67216099999996
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10206.804313701621,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09797385834639735,
              "min": 0.07494100000076287,
              "max": 0.42337399999996705,
              "p75": 0.10439599999972415,
              "p99": 0.13255900000012844,
              "p995": 0.1418469999998706,
              "p999": 0.3506580000002941
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6711.580794663588,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14899619487485052,
              "min": 0.14115700000002107,
              "max": 0.4970669999999018,
              "p75": 0.14873000000000047,
              "p99": 0.20288200000004508,
              "p995": 0.328679999999963,
              "p999": 0.434729999999945
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 13.981535807645074,
            "unit": "ops/s",
            "extra": {
              "mean": 71.5229009,
              "min": 70.50343600000008,
              "max": 75.877299,
              "p75": 71.240319,
              "p99": 75.877299,
              "p995": 75.877299,
              "p999": 75.877299
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1663.8072446031133,
            "unit": "ops/s",
            "extra": {
              "mean": 0.6010311610576868,
              "min": 0.3618059999998877,
              "max": 1.8719290000003639,
              "p75": 0.6503909999996722,
              "p99": 1.368155999999999,
              "p995": 1.5596340000001874,
              "p999": 1.8719290000003639
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 694.6288776155061,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4396176609195395,
              "min": 0.9520649999999478,
              "max": 5.43163299999992,
              "p75": 1.6211169999999129,
              "p99": 2.6837299999999686,
              "p995": 3.1233689999999115,
              "p999": 5.43163299999992
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 912266.8085795661,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0010961705397974939,
              "min": 0.0010209999998096464,
              "max": 0.3587360000001354,
              "p75": 0.0010929999998552375,
              "p99": 0.001191999999946347,
              "p995": 0.0018939999999929569,
              "p999": 0.00947800000017196
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 471216.3818429428,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0021221673068516148,
              "min": 0.0017129999999951906,
              "max": 1.2246380000000272,
              "p75": 0.0018730000000459768,
              "p99": 0.003677000000038788,
              "p995": 0.0039669999999887295,
              "p999": 0.01521900000000187
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1900973.057130046,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005260463825351259,
              "min": 0.0004999999946448952,
              "max": 2.9107939999958035,
              "p75": 0.0005110000056447461,
              "p99": 0.0005910000036237761,
              "p995": 0.0008420000085607171,
              "p999": 0.001061999995727092
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1413050.595446541,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000707688743221532,
              "min": 0.0006609999982174486,
              "max": 0.3576069999980973,
              "p75": 0.0006819999980507419,
              "p99": 0.0008309999975608662,
              "p995": 0.0009509999945294112,
              "p999": 0.001352999999653548
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 292845.61637288827,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034147685472835382,
              "min": 0.003206000001227949,
              "max": 0.08598099999653641,
              "p75": 0.0033859999966807663,
              "p99": 0.005460000000311993,
              "p995": 0.006832999999460299,
              "p999": 0.012604000003193505
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 302878.41655195726,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033016548732136383,
              "min": 0.0031159999998635612,
              "max": 0.21914099999412429,
              "p75": 0.0032659999997122213,
              "p99": 0.0037370000063674524,
              "p995": 0.0053299999999580905,
              "p999": 0.013395000001764856
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42867.67257658044,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023327601894261044,
              "min": 0.02231200000096578,
              "max": 2.2601250000006985,
              "p75": 0.022903000004589558,
              "p99": 0.03276200000254903,
              "p995": 0.040374999996856786,
              "p999": 0.04747900000074878
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12423.170817026812,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08049474765568151,
              "min": 0.07830700000340585,
              "max": 0.45432200000504963,
              "p75": 0.07925900000554975,
              "p99": 0.09733200000482611,
              "p995": 0.1213969999953406,
              "p999": 0.2719290000095498
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9983603510639855,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.6423417999995,
              "min": 1001.0070539999997,
              "max": 1002.1930229999998,
              "p75": 1001.8403760000001,
              "p99": 1002.1930229999998,
              "p995": 1002.1930229999998,
              "p999": 1002.1930229999998
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328267941949731,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.5657905,
              "min": 3003.4528680000003,
              "max": 3005.302328000005,
              "p75": 3005.0834190000023,
              "p99": 3005.302328000005,
              "p995": 3005.302328000005,
              "p999": 3005.302328000005
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.127809781236047,
            "unit": "ops/s",
            "extra": {
              "mean": 98.73803138095225,
              "min": 97.48376200000348,
              "max": 99.8165930000032,
              "p75": 99.25260600000183,
              "p99": 99.8165930000032,
              "p995": 99.8165930000032,
              "p999": 99.8165930000032
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2665285.6854959996,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00037519430109943496,
              "min": 0.0003009999999221691,
              "max": 4.064195999999924,
              "p75": 0.00035000000002582965,
              "p99": 0.000711000000023887,
              "p995": 0.0009519999999838547,
              "p999": 0.001993999999967855
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
        "date": 1752176247061,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4615.682533355383,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21665268197573528,
              "min": 0.15272700000002715,
              "max": 1.0035219999999754,
              "p75": 0.23735499999997955,
              "p99": 0.3104129999999259,
              "p995": 0.41399599999999737,
              "p999": 0.717736000000059
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 11085.684412736033,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09020642864874702,
              "min": 0.07826699999986886,
              "max": 0.3322239999999965,
              "p75": 0.09517899999991641,
              "p99": 0.12928299999998671,
              "p995": 0.14097500000002583,
              "p999": 0.2873500000000604
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4732.390364712417,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21130970248283165,
              "min": 0.14282800000000861,
              "max": 2.9964380000001256,
              "p75": 0.23547199999984514,
              "p99": 0.2671909999999116,
              "p995": 0.27738099999987753,
              "p999": 0.6447510000002694
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9572.819326755493,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10446243325673725,
              "min": 0.07447000000001935,
              "max": 0.36180000000013024,
              "p75": 0.11288100000001577,
              "p99": 0.15063199999985954,
              "p995": 0.15458100000023478,
              "p999": 0.2829509999996844
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6886.33846425537,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14521505226480783,
              "min": 0.13677599999994072,
              "max": 0.3927779999999643,
              "p75": 0.14728600000000824,
              "p99": 0.2410220000000436,
              "p995": 0.26557900000000245,
              "p999": 0.3454079999999635
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 13.639303668865344,
            "unit": "ops/s",
            "extra": {
              "mean": 73.3175259,
              "min": 72.33737900000006,
              "max": 75.87967000000003,
              "p75": 73.21997399999998,
              "p99": 75.87967000000003,
              "p995": 75.87967000000003,
              "p999": 75.87967000000003
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1850.8604215367238,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5402892559395293,
              "min": 0.3534829999998692,
              "max": 4.17886899999985,
              "p75": 0.6308340000000499,
              "p99": 1.2443349999998645,
              "p995": 1.4635130000001482,
              "p999": 4.17886899999985
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 683.5801177484749,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4628863157894723,
              "min": 1.0275669999996353,
              "max": 5.485272000000123,
              "p75": 1.6175049999999374,
              "p99": 3.0635870000000978,
              "p995": 3.8252850000001217,
              "p999": 5.485272000000123
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 904404.1785298926,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001105700331488404,
              "min": 0.0010219999999208085,
              "max": 2.560730999999805,
              "p75": 0.0010929999998552375,
              "p99": 0.001211999999895852,
              "p995": 0.002073999999993248,
              "p999": 0.00976900000000569
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 524652.9748280903,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019060217857864309,
              "min": 0.0017329999999446954,
              "max": 1.2225119999999379,
              "p75": 0.0018430000000080327,
              "p99": 0.0035359999999400316,
              "p995": 0.0037669999999820902,
              "p999": 0.011572000000001026
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1903913.1203701473,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005252340504936412,
              "min": 0.0004999999946448952,
              "max": 0.40630200000305194,
              "p75": 0.0005110000056447461,
              "p99": 0.0005920000112382695,
              "p995": 0.0008419999940088019,
              "p999": 0.000981999997748062
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1381602.1237947585,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000723797381878195,
              "min": 0.0006709999870508909,
              "max": 3.3564530000003288,
              "p75": 0.0006920000014360994,
              "p99": 0.0008920000109355897,
              "p995": 0.000981999997748062,
              "p999": 0.0014019999944139272
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 291147.180711196,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034346889348447853,
              "min": 0.003246000000217464,
              "max": 0.030697000001964625,
              "p75": 0.003416999999899417,
              "p99": 0.0036469999977271073,
              "p995": 0.006000999994284939,
              "p999": 0.012704000000667293
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 290834.3294461912,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003438383638906064,
              "min": 0.003174999998009298,
              "max": 0.2048639999993611,
              "p75": 0.0033760000005713664,
              "p99": 0.005389999998442363,
              "p995": 0.006993000002694316,
              "p999": 0.01477800000429852
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41257.17246353649,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024238209753317686,
              "min": 0.022772000011173077,
              "max": 4.18683800000872,
              "p75": 0.023494000008213334,
              "p99": 0.04096699999354314,
              "p995": 0.04842099999950733,
              "p999": 0.06352899999183137
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12075.797265471401,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08281026734850232,
              "min": 0.07831699999223929,
              "max": 0.41343300000880845,
              "p75": 0.08242500000051223,
              "p99": 0.1024020000040764,
              "p995": 0.11417400000209454,
              "p999": 0.20533399999840185
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9987874293127125,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.2140427999999,
              "min": 1000.0310480000007,
              "max": 1001.7765739999995,
              "p75": 1001.6781119999996,
              "p99": 1001.7765739999995,
              "p995": 1001.7765739999995,
              "p999": 1001.7765739999995
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33287168960923813,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.1605556000013,
              "min": 3003.516536999996,
              "max": 3004.856338000005,
              "p75": 3004.716492000003,
              "p99": 3004.856338000005,
              "p995": 3004.856338000005,
              "p999": 3004.856338000005
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.117950650511832,
            "unit": "ops/s",
            "extra": {
              "mean": 98.83424366666718,
              "min": 96.90791400000307,
              "max": 99.95834199999808,
              "p75": 99.23274199999287,
              "p99": 99.95834199999808,
              "p995": 99.95834199999808,
              "p999": 99.95834199999808
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2612920.3486344563,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003827135413915744,
              "min": 0.0003100000000131331,
              "max": 4.382073999999989,
              "p75": 0.0003609999999980573,
              "p99": 0.000661000000036438,
              "p995": 0.0011119999999777974,
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
          "id": "7e281165f8aaac122bad3060f0fbcac6604506ed",
          "message": "docs: Document Claude Code integration and specs directory\n\n- Add .claude/ directory structure to directory listing\n- Document shared Claude Code hooks and their purpose\n- Explain specs/ directory for feature documentation\n- Helps developers understand and use shared development tools",
          "timestamp": "2025-07-11T09:43:54+03:00",
          "tree_id": "5e1a23bd22708c32c71577d53c29dc9c3d4a4e8a",
          "url": "https://github.com/carlrannaberg/autoagent/commit/7e281165f8aaac122bad3060f0fbcac6604506ed"
        },
        "date": 1752216647010,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4588.6848278641155,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21792736644880178,
              "min": 0.16296799999997802,
              "max": 0.9832239999999501,
              "p75": 0.23512299999993047,
              "p99": 0.31569500000000517,
              "p995": 0.467392000000018,
              "p999": 0.8335250000000087
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10277.525157782822,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09729968884996928,
              "min": 0.07768699999996898,
              "max": 0.44886699999995017,
              "p75": 0.10550899999998364,
              "p99": 0.13359200000002147,
              "p995": 0.14503300000001218,
              "p999": 0.284546999999975
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4613.010840943484,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2167781595318066,
              "min": 0.14163800000005722,
              "max": 3.3599779999999555,
              "p75": 0.24065399999972215,
              "p99": 0.27476900000010573,
              "p995": 0.3004160000000411,
              "p999": 0.639875999999731
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 8814.84735293084,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11344495939200934,
              "min": 0.07625399999960791,
              "max": 0.4558200000001307,
              "p75": 0.12508600000001024,
              "p99": 0.15138600000000224,
              "p995": 0.15718599999991056,
              "p999": 0.35227500000019063
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6822.687001177342,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14656981916764425,
              "min": 0.1388719999999921,
              "max": 0.422916999999984,
              "p75": 0.14904999999998836,
              "p99": 0.20846300000005158,
              "p995": 0.269027000000051,
              "p999": 0.3687950000000342
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 13.689220073346105,
            "unit": "ops/s",
            "extra": {
              "mean": 73.05018069999998,
              "min": 70.96220300000004,
              "max": 78.02110900000002,
              "p75": 73.92542900000001,
              "p99": 78.02110900000002,
              "p995": 78.02110900000002,
              "p999": 78.02110900000002
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1732.4661922410864,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5772118408304513,
              "min": 0.3522840000000542,
              "max": 3.389415999999983,
              "p75": 0.6521279999997205,
              "p99": 1.3325999999997293,
              "p995": 1.5103559999997742,
              "p999": 3.389415999999983
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 730.0192344311056,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3698269207650218,
              "min": 1.0046129999998357,
              "max": 2.8423649999999725,
              "p75": 1.6558399999998983,
              "p99": 2.521690999999919,
              "p995": 2.6010809999997946,
              "p999": 2.8423649999999725
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 853458.7061566858,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011717028519203023,
              "min": 0.0010819999999966967,
              "max": 0.2948260000000573,
              "p75": 0.0011719999999968422,
              "p99": 0.0013529999998809217,
              "p995": 0.0017930000001342705,
              "p999": 0.00969800000007126
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 502581.8844061531,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001989725517428055,
              "min": 0.0017929999999637403,
              "max": 0.28550899999999046,
              "p75": 0.0019130000000586733,
              "p99": 0.003868000000011307,
              "p995": 0.004138000000011743,
              "p999": 0.011913000000049578
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1904310.689836462,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005251243955816253,
              "min": 0.0004999999946448952,
              "max": 0.419819999995525,
              "p75": 0.0005110000056447461,
              "p99": 0.0005910000036237761,
              "p995": 0.0008509999897796661,
              "p999": 0.0010320000001229346
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1383382.2320205022,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000722866014072949,
              "min": 0.0006709999870508909,
              "max": 0.3641360000037821,
              "p75": 0.0006920000014360994,
              "p99": 0.0009620000055292621,
              "p995": 0.001061999995727092,
              "p999": 0.0015730000013718382
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 294986.52919766767,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033899853078711586,
              "min": 0.003205999993951991,
              "max": 0.03194999999686843,
              "p75": 0.0033760000005713664,
              "p99": 0.0036270000055083074,
              "p995": 0.004207999998470768,
              "p999": 0.012483999998949002
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 295330.79445954674,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003386033623178351,
              "min": 0.0031759999983478338,
              "max": 0.1494109999985085,
              "p75": 0.003346000004967209,
              "p99": 0.004108000000996981,
              "p995": 0.0058209999988321215,
              "p999": 0.013154999993275851
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42779.66238296822,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023375593548352263,
              "min": 0.022351999999955297,
              "max": 2.3250390000030166,
              "p75": 0.022943000003579073,
              "p99": 0.03370400000130758,
              "p995": 0.04036600000108592,
              "p999": 0.04644800000824034
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 11796.551548196398,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08477053619563019,
              "min": 0.0804809999972349,
              "max": 0.350510000003851,
              "p75": 0.08833699999377131,
              "p99": 0.10364500001014676,
              "p995": 0.11325300000316929,
              "p999": 0.2454920000018319
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9984669810554362,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.5353726999999,
              "min": 1000.070518999999,
              "max": 1002.3538590000007,
              "p75": 1001.9774799999996,
              "p99": 1002.3538590000007,
              "p995": 1002.3538590000007,
              "p999": 1002.3538590000007
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33284577089603634,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.394489699999,
              "min": 3003.005105999997,
              "max": 3005.2173479999983,
              "p75": 3004.878168999996,
              "p99": 3005.2173479999983,
              "p995": 3005.2173479999983,
              "p999": 3005.2173479999983
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.159429557512565,
            "unit": "ops/s",
            "extra": {
              "mean": 98.43072333333251,
              "min": 96.37268700000277,
              "max": 99.36864099999366,
              "p75": 98.90668000000005,
              "p99": 99.36864099999366,
              "p995": 99.36864099999366,
              "p999": 99.36864099999366
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2561874.652453733,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00039033916005305405,
              "min": 0.0003199999998741987,
              "max": 4.640822000000071,
              "p75": 0.0003609999999980573,
              "p99": 0.0007020000000466098,
              "p995": 0.0011419999999588981,
              "p999": 0.0022339999999303473
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
        "date": 1752391195799,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4174.836965568436,
            "unit": "ops/s",
            "extra": {
              "mean": 0.23953031178161044,
              "min": 0.16043200000001434,
              "max": 3.0178939999999557,
              "p75": 0.2591279999999756,
              "p99": 0.4229759999999487,
              "p995": 0.6869140000000016,
              "p999": 0.879006000000004
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 8829.214235249916,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11326036194790491,
              "min": 0.08028100000001359,
              "max": 0.5441570000000411,
              "p75": 0.13029600000004393,
              "p99": 0.2699489999999969,
              "p995": 0.3167550000000574,
              "p999": 0.42980999999986125
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4241.9214990007,
            "unit": "ops/s",
            "extra": {
              "mean": 0.23574222206506582,
              "min": 0.15309900000011112,
              "max": 2.975224000000253,
              "p75": 0.2505719999999201,
              "p99": 0.4402789999999186,
              "p995": 0.6304380000001402,
              "p999": 0.8896249999997963
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 8374.416849991738,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1194112996657178,
              "min": 0.07908899999983987,
              "max": 3.0204990000002,
              "p75": 0.12986499999988155,
              "p99": 0.23196699999971315,
              "p995": 0.2804479999999785,
              "p999": 0.5178850000002058
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6521.891423551584,
            "unit": "ops/s",
            "extra": {
              "mean": 0.15332975283655312,
              "min": 0.14466199999998253,
              "max": 0.6167520000000195,
              "p75": 0.15239699999995082,
              "p99": 0.24209600000000364,
              "p995": 0.31123600000000806,
              "p999": 0.455628000000047
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 13.846607024299276,
            "unit": "ops/s",
            "extra": {
              "mean": 72.21985850000002,
              "min": 69.91866100000004,
              "max": 76.70842199999993,
              "p75": 73.01190799999995,
              "p99": 76.70842199999993,
              "p995": 76.70842199999993,
              "p999": 76.70842199999993
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1767.8289059828187,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5656656006787338,
              "min": 0.3538069999999607,
              "max": 1.7945300000001225,
              "p75": 0.6529399999999441,
              "p99": 1.412209999999959,
              "p995": 1.4730469999999514,
              "p999": 1.7945300000001225
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 693.316050649195,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4423436455331415,
              "min": 0.9494190000000344,
              "max": 4.441697000000204,
              "p75": 1.6153130000000147,
              "p99": 3.1856900000000223,
              "p995": 3.7207089999999425,
              "p999": 4.441697000000204
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 887088.1885659641,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011272836375113564,
              "min": 0.0010310000000117725,
              "max": 0.05899100000010549,
              "p75": 0.0011319999998704589,
              "p99": 0.0012519999997948617,
              "p995": 0.0021139999998922576,
              "p999": 0.009657999999944877
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 524851.4803970243,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019053009038738906,
              "min": 0.001722999999969943,
              "max": 0.2563229999999521,
              "p75": 0.0018539999999802603,
              "p99": 0.0035860000000411674,
              "p995": 0.0038170000000263826,
              "p999": 0.012212999999974272
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1929890.5911732414,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005181640889767064,
              "min": 0.0004899999912595376,
              "max": 0.46522600000025705,
              "p75": 0.0005010000022593886,
              "p99": 0.0007919999916339293,
              "p995": 0.0008309999975608662,
              "p999": 0.0010820000024978071
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1404282.6041542464,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007121073757103666,
              "min": 0.0006709999870508909,
              "max": 0.4102419999981066,
              "p75": 0.000690999993821606,
              "p99": 0.000822000001790002,
              "p995": 0.0009319999953731894,
              "p999": 0.001512999995611608
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 282734.5314783459,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0035368866857941193,
              "min": 0.0032550000032642856,
              "max": 0.38317900000402005,
              "p75": 0.0035270000007585622,
              "p99": 0.00385699999606004,
              "p995": 0.005819999998493586,
              "p999": 0.013625000006868504
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 283336.0784151418,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0035293775702464826,
              "min": 0.003246000000217464,
              "max": 0.21336000000155764,
              "p75": 0.003475999998045154,
              "p99": 0.0052800000048591755,
              "p995": 0.006702999999106396,
              "p999": 0.015398000003187917
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42389.45478680772,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023590772870973938,
              "min": 0.022423000002163462,
              "max": 2.393560999989859,
              "p75": 0.02322400000412017,
              "p99": 0.033452999996370636,
              "p995": 0.03690999999525957,
              "p999": 0.044884999995701946
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12360.6943385606,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08090160411785167,
              "min": 0.0786179999995511,
              "max": 0.6356340000056662,
              "p75": 0.07964100000390317,
              "p99": 0.09473799999977928,
              "p995": 0.11309299999265932,
              "p999": 0.3247410000039963
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9987467409292105,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.2548316999998,
              "min": 999.8340530000005,
              "max": 1002.1028590000005,
              "p75": 1001.8388779999987,
              "p99": 1002.1028590000005,
              "p995": 1002.1028590000005,
              "p999": 1002.1028590000005
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328710530661541,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.1663003999993,
              "min": 3002.6908829999957,
              "max": 3004.629510999999,
              "p75": 3004.5526820000014,
              "p99": 3004.629510999999,
              "p995": 3004.629510999999,
              "p999": 3004.629510999999
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.113978878128385,
            "unit": "ops/s",
            "extra": {
              "mean": 98.8730559999995,
              "min": 97.82975199999782,
              "max": 99.79304599999887,
              "p75": 99.42389199999889,
              "p99": 99.79304599999887,
              "p995": 99.79304599999887,
              "p999": 99.79304599999887
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2597303.090944085,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003850147499098819,
              "min": 0.00031100000001060835,
              "max": 4.259534999999914,
              "p75": 0.0003609999999980573,
              "p99": 0.0006910000000743821,
              "p995": 0.0009320000000343498,
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
        "date": 1752479091810,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4978.6310357813445,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2008584273092373,
              "min": 0.161160000000109,
              "max": 0.708752000000004,
              "p75": 0.20824899999990976,
              "p99": 0.29528099999993174,
              "p995": 0.3341540000000123,
              "p999": 0.5934169999999881
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10581.674274902573,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09450300340200249,
              "min": 0.07808500000010099,
              "max": 0.3153780000000097,
              "p75": 0.1055069999999887,
              "p99": 0.1316150000000107,
              "p995": 0.13762699999983852,
              "p999": 0.267229000000043
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4631.059095387781,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21593332743171684,
              "min": 0.1454510000000937,
              "max": 2.6630709999999453,
              "p75": 0.23614999999972497,
              "p99": 0.2622289999999339,
              "p995": 0.2716369999998278,
              "p999": 0.5704240000000027
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10011.157460988179,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09988854974031067,
              "min": 0.07321600000022954,
              "max": 0.41054299999996147,
              "p75": 0.10885299999972631,
              "p99": 0.14625299999988783,
              "p995": 0.1512950000001183,
              "p999": 0.268771999999899
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6652.4651698458865,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1503202158100388,
              "min": 0.14311699999996108,
              "max": 0.36797599999999875,
              "p75": 0.14961000000005242,
              "p99": 0.248533000000009,
              "p995": 0.2670380000000705,
              "p999": 0.32576700000004166
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.43132734761224,
            "unit": "ops/s",
            "extra": {
              "mean": 69.29369530000001,
              "min": 68.31376,
              "max": 73.31593799999996,
              "p75": 69.306331,
              "p99": 73.31593799999996,
              "p995": 73.31593799999996,
              "p999": 73.31593799999996
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1893.4416959946016,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5281387866948353,
              "min": 0.3499229999997624,
              "max": 1.6281159999998636,
              "p75": 0.624554999999873,
              "p99": 1.1869959999999082,
              "p995": 1.2381900000000314,
              "p999": 1.6281159999998636
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 719.8056870151837,
            "unit": "ops/s",
            "extra": {
              "mean": 1.389263822222213,
              "min": 1.0299019999999928,
              "max": 6.307626999999911,
              "p75": 1.5890039999999317,
              "p99": 3.1628209999998944,
              "p995": 5.24602700000014,
              "p999": 6.307626999999911
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 912097.3086302807,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0010963742470655078,
              "min": 0.001011999999946056,
              "max": 2.407831999999871,
              "p75": 0.0010819999999966967,
              "p99": 0.0019340000001193403,
              "p995": 0.002143999999816515,
              "p999": 0.009607999999843742
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 540091.9157456569,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0018515366937484868,
              "min": 0.0017129999999951906,
              "max": 0.14034200000003239,
              "p75": 0.0018129999999700885,
              "p99": 0.003446000000053573,
              "p995": 0.003635999999971773,
              "p999": 0.010870999999951891
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1910017.0067904312,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005235555476442524,
              "min": 0.0004999999946448952,
              "max": 0.43011299999488983,
              "p75": 0.0005110000056447461,
              "p99": 0.0006319999956758693,
              "p995": 0.0008519999973941594,
              "p999": 0.001021999996737577
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1409641.9419296577,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007094000045366845,
              "min": 0.0006709999870508909,
              "max": 0.5435839999991003,
              "p75": 0.0006819999980507419,
              "p99": 0.0009310000023106113,
              "p995": 0.0010020000045187771,
              "p999": 0.001452000011340715
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 293927.5832106571,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00340219855883108,
              "min": 0.0032260000007227063,
              "max": 0.02439599999343045,
              "p75": 0.0033570000014151447,
              "p99": 0.005751000004238449,
              "p995": 0.007002999998803716,
              "p999": 0.012292999999772292
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 298603.9253481113,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033489177974944696,
              "min": 0.0031559999988530762,
              "max": 0.17042799999762792,
              "p75": 0.003306999999040272,
              "p99": 0.004579000000376254,
              "p995": 0.0060209999937796965,
              "p999": 0.01279400000203168
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 43206.13548244138,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023144860997956918,
              "min": 0.022310999993351288,
              "max": 0.2928670000110287,
              "p75": 0.022842999998829328,
              "p99": 0.03224000000045635,
              "p995": 0.04023500000766944,
              "p999": 0.045335000002523884
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12060.444353108378,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08291568459020059,
              "min": 0.0809809999918798,
              "max": 0.32357399999455083,
              "p75": 0.08190299999841955,
              "p99": 0.0963400000036927,
              "p995": 0.10887199999706354,
              "p999": 0.19630599999800324
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9988082920622537,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.1931297999997,
              "min": 999.6553960000001,
              "max": 1002.0199359999988,
              "p75": 1001.7036879999996,
              "p99": 1002.0199359999988,
              "p995": 1002.0199359999988,
              "p999": 1002.0199359999988
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328889833314465,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.0044881999993,
              "min": 3002.26311,
              "max": 3004.979081999998,
              "p75": 3004.3491269999977,
              "p99": 3004.979081999998,
              "p995": 3004.979081999998,
              "p999": 3004.979081999998
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.11645494484097,
            "unit": "ops/s",
            "extra": {
              "mean": 98.84885619047452,
              "min": 97.45241099999839,
              "max": 99.69178899999679,
              "p75": 99.54675699999643,
              "p99": 99.69178899999679,
              "p995": 99.69178899999679,
              "p999": 99.69178899999679
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2667565.904675792,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003748735872831367,
              "min": 0.0003199999998741987,
              "max": 4.033461999999986,
              "p75": 0.0003510000000233049,
              "p99": 0.0006809999999859428,
              "p995": 0.0008409999999230422,
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
          "id": "73474a4d3652ad5d00d9dfe75b3aed7d169c2ea9",
          "message": "feat: Complete issue from issues/86-implement-plan-from-hooks-system-implementation.md\n\nCo-authored-by: Claude <claude@autoagent-cli>",
          "timestamp": "2025-07-14T10:54:27+03:00",
          "tree_id": "74bbe395147fb6f11990cc949bf1d365cbf84046",
          "url": "https://github.com/carlrannaberg/autoagent/commit/73474a4d3652ad5d00d9dfe75b3aed7d169c2ea9"
        },
        "date": 1752479779069,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4327.091795357228,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2311020998151586,
              "min": 0.15808400000003076,
              "max": 1.13226300000008,
              "p75": 0.2586710000000494,
              "p99": 0.3007790000000341,
              "p995": 0.38475499999992735,
              "p999": 0.7014939999999683
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 8715.748149741443,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1147348435061958,
              "min": 0.07835599999998522,
              "max": 0.5769219999999677,
              "p75": 0.1285689999999704,
              "p99": 0.153295000000071,
              "p995": 0.16933800000015253,
              "p999": 0.30874999999991815
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4846.646875732015,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20632821528780443,
              "min": 0.14243499999997766,
              "max": 2.8953389999996944,
              "p75": 0.21802500000012515,
              "p99": 0.2759120000000621,
              "p995": 0.3206350000000384,
              "p999": 0.606467000000066
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9720.696629554635,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1028732855379539,
              "min": 0.07341600000017934,
              "max": 0.34848799999963376,
              "p75": 0.11026500000025408,
              "p99": 0.1443779999999606,
              "p995": 0.1484760000003007,
              "p999": 0.29768300000023373
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6757.94380098733,
            "unit": "ops/s",
            "extra": {
              "mean": 0.147974003550296,
              "min": 0.13883800000007795,
              "max": 0.4115950000000339,
              "p75": 0.15056899999990492,
              "p99": 0.25349099999993996,
              "p995": 0.27479099999999335,
              "p999": 0.3600789999999279
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.08017381918259,
            "unit": "ops/s",
            "extra": {
              "mean": 71.0218505,
              "min": 70.05300699999998,
              "max": 75.43507999999997,
              "p75": 70.94338700000003,
              "p99": 75.43507999999997,
              "p995": 75.43507999999997,
              "p999": 75.43507999999997
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1771.860232121193,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5643786015801281,
              "min": 0.3582549999996445,
              "max": 3.0322809999997844,
              "p75": 0.6344489999996767,
              "p99": 1.3043569999999818,
              "p995": 1.4933639999999286,
              "p999": 3.0322809999997844
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 699.5868158547418,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4294151595441649,
              "min": 0.943082000000004,
              "max": 5.868408000000045,
              "p75": 1.6063739999999598,
              "p99": 2.862920000000031,
              "p995": 3.538765000000012,
              "p999": 5.868408000000045
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 903238.4392040515,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011071273725697683,
              "min": 0.0010120000001734297,
              "max": 0.3108879999999772,
              "p75": 0.0011019999999462016,
              "p99": 0.0018730000001596636,
              "p995": 0.0021139999998922576,
              "p999": 0.009808000000020911
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 525830.61916879,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019017530808319151,
              "min": 0.001722999999969943,
              "max": 0.2333529999999655,
              "p75": 0.001824000000056003,
              "p99": 0.003677000000038788,
              "p995": 0.0039669999999887295,
              "p999": 0.011471000000028653
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1917517.8427390682,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005215075331823538,
              "min": 0.0004999999946448952,
              "max": 0.4740710000041872,
              "p75": 0.0005110000056447461,
              "p99": 0.0005919999966863543,
              "p995": 0.0008420000085607171,
              "p999": 0.0010110000002896413
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1413646.9171545908,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007073902173626316,
              "min": 0.0006709999870508909,
              "max": 0.3131309999880614,
              "p75": 0.0006819999980507419,
              "p99": 0.0008119999984046444,
              "p995": 0.000921000013477169,
              "p999": 0.001352999999653548
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 285074.14131791494,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0035078593778339194,
              "min": 0.003285999999206979,
              "max": 0.040764999997918494,
              "p75": 0.003496999997878447,
              "p99": 0.0037870000014663674,
              "p995": 0.006591999997908715,
              "p999": 0.012764000006427523
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 294852.6743418544,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003391524266253025,
              "min": 0.0031759999983478338,
              "max": 0.16301300000486663,
              "p75": 0.003356000001076609,
              "p99": 0.005089000005682465,
              "p995": 0.006541999995533843,
              "p999": 0.013144000004103873
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 40053.84130682111,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024966394417448832,
              "min": 0.02374400000553578,
              "max": 0.2786280000000261,
              "p75": 0.024706000011065044,
              "p99": 0.03565599999274127,
              "p995": 0.04145699999935459,
              "p999": 0.04608600000210572
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 11323.42387262544,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0883125114142831,
              "min": 0.08363499998813495,
              "max": 0.3599580000009155,
              "p75": 0.08762299999943934,
              "p99": 0.10160799999721348,
              "p995": 0.11774900001182687,
              "p999": 0.2424299999984214
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.998752895212358,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.2486620000003,
              "min": 1000.1616520000007,
              "max": 1001.8388350000005,
              "p75": 1001.7375380000012,
              "p99": 1001.8388350000005,
              "p995": 1001.8388350000005,
              "p999": 1001.8388350000005
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328754332937198,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.1267692999995,
              "min": 3001.7035140000007,
              "max": 3004.620358,
              "p75": 3004.5401309999943,
              "p99": 3004.620358,
              "p995": 3004.620358,
              "p999": 3004.620358
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.15809883142889,
            "unit": "ops/s",
            "extra": {
              "mean": 98.4436179047625,
              "min": 95.99507099999755,
              "max": 99.67384899999888,
              "p75": 99.11675300000206,
              "p99": 99.67384899999888,
              "p995": 99.67384899999888,
              "p999": 99.67384899999888
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2613132.8926311857,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003826824126778686,
              "min": 0.0003199999998741987,
              "max": 3.961480000000165,
              "p75": 0.0003600000000005821,
              "p99": 0.0007209999999986394,
              "p995": 0.0008619999999837091,
              "p999": 0.0015429999998559651
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
        "date": 1752481986816,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4840.708460257139,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20658133168112336,
              "min": 0.15903700000001209,
              "max": 0.9938640000000305,
              "p75": 0.2149819999999636,
              "p99": 0.2969759999999724,
              "p995": 0.40190199999995,
              "p999": 0.7706810000000814
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10224.109173697405,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09780803227068477,
              "min": 0.07726400000001377,
              "max": 0.4358550000001742,
              "p75": 0.10692000000017288,
              "p99": 0.1539780000000519,
              "p995": 0.17368499999997766,
              "p999": 0.3474700000001576
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4793.800156059126,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20860277179807957,
              "min": 0.14278699999999844,
              "max": 3.190820000000258,
              "p75": 0.21986100000003717,
              "p99": 0.32217299999956595,
              "p995": 0.40594899999996414,
              "p999": 0.7118009999999231
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9396.507571495344,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10642251840817298,
              "min": 0.07239500000014232,
              "max": 0.39989799999966635,
              "p75": 0.122429000000011,
              "p99": 0.15913799999998446,
              "p995": 0.17693099999996775,
              "p999": 0.3643120000001545
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6842.731904923329,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14614046171829448,
              "min": 0.13828899999998612,
              "max": 0.42982499999993706,
              "p75": 0.14812700000004497,
              "p99": 0.18633900000008907,
              "p995": 0.2864759999999933,
              "p999": 0.4031840000000102
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.175119999478348,
            "unit": "ops/s",
            "extra": {
              "mean": 70.54614000000004,
              "min": 69.81130500000006,
              "max": 71.44358000000011,
              "p75": 71.22677899999996,
              "p99": 71.44358000000011,
              "p995": 71.44358000000011,
              "p999": 71.44358000000011
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1729.4450003460504,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5782201803468203,
              "min": 0.34288100000003396,
              "max": 1.6202999999995882,
              "p75": 0.6332039999997505,
              "p99": 1.2847529999999097,
              "p995": 1.3752819999999701,
              "p999": 1.6202999999995882
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 677.509187953914,
            "unit": "ops/s",
            "extra": {
              "mean": 1.475994743362835,
              "min": 0.952541999999994,
              "max": 5.031032000000096,
              "p75": 1.6023170000000846,
              "p99": 2.911495000000059,
              "p995": 4.361175999999887,
              "p999": 5.031032000000096
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 889289.4539523282,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011244932631952775,
              "min": 0.001031999999895561,
              "max": 2.2846539999998186,
              "p75": 0.0011019999999462016,
              "p99": 0.0020440000000689906,
              "p995": 0.0021939999999176507,
              "p999": 0.009708000000046013
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 533483.779137711,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0018744712381252452,
              "min": 0.0016830000000709333,
              "max": 0.22509100000002036,
              "p75": 0.0017830000000458313,
              "p99": 0.0038669999999001448,
              "p995": 0.004087000000026819,
              "p999": 0.01104099999997743
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1948154.297306189,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005133063645845457,
              "min": 0.0004899999912595376,
              "max": 0.4654819999996107,
              "p75": 0.0005010000022593886,
              "p99": 0.0005810000002384186,
              "p995": 0.0008210000087274238,
              "p999": 0.000981999997748062
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1404880.2129841181,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007118044590263616,
              "min": 0.0006709999870508909,
              "max": 0.28122699999948964,
              "p75": 0.0006820000126026571,
              "p99": 0.0008209999941755086,
              "p995": 0.0009220000065397471,
              "p999": 0.0014519999967887998
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 300921.54861787456,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033231252616935407,
              "min": 0.0031459999954677187,
              "max": 0.3043390000020736,
              "p75": 0.0033059999987017363,
              "p99": 0.00369700000010198,
              "p995": 0.0057809999998426065,
              "p999": 0.012554000000818633
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 295033.7716451745,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033894424845799034,
              "min": 0.0031859999944572337,
              "max": 0.1414440000007744,
              "p75": 0.003346000004967209,
              "p99": 0.0050789999950211495,
              "p995": 0.006492000000434928,
              "p999": 0.014437999998335727
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41615.49994816743,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024029508266042967,
              "min": 0.02262200000404846,
              "max": 2.428312999996706,
              "p75": 0.02366400000755675,
              "p99": 0.03477499999280553,
              "p995": 0.041066999998292886,
              "p999": 0.04827099999238271
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12473.055154718273,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08017281953745893,
              "min": 0.07831699999223929,
              "max": 0.3966119999968214,
              "p75": 0.07919899999978952,
              "p99": 0.09063000000605825,
              "p995": 0.10300299999653362,
              "p999": 0.2390070000110427
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9988005936032137,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.2008466999998,
              "min": 999.9098299999987,
              "max": 1001.9932109999991,
              "p75": 1001.7702950000003,
              "p99": 1001.9932109999991,
              "p995": 1001.9932109999991,
              "p999": 1001.9932109999991
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328834311122792,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.054592500001,
              "min": 3002.3428889999996,
              "max": 3004.631143000006,
              "p75": 3004.559346000002,
              "p99": 3004.631143000006,
              "p995": 3004.631143000006,
              "p999": 3004.631143000006
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.13297464018524,
            "unit": "ops/s",
            "extra": {
              "mean": 98.68770380952212,
              "min": 97.50383800000418,
              "max": 99.84760200000164,
              "p75": 99.25715499999933,
              "p99": 99.84760200000164,
              "p995": 99.84760200000164,
              "p999": 99.84760200000164
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2587537.2289140206,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038646786945735896,
              "min": 0.0003100000000131331,
              "max": 4.057671000000028,
              "p75": 0.0003609999999980573,
              "p99": 0.000711000000023887,
              "p995": 0.001111999999920954,
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
          "id": "ab3bc447547d5070ae2b312278db4f89a6faaf81",
          "message": "fix: Update test fixtures and templates to use Acceptance Criteria\n\n- Update all test issue templates to include required Description section\n- Change all occurrences of \"Success Criteria\" to \"Acceptance Criteria\"\n- Fix singular \"Requirement\" to plural \"Requirements\" in templates\n- Update test helpers to create validation-compliant issue files\n- Fix integration tests to properly disable git auto-push\n- Ensure all issue files pass validation with required sections\n\nThis completes the migration to standardized \"Acceptance Criteria\" sections\nacross the entire codebase, including all test fixtures and utilities.\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-14T14:49:26+03:00",
          "tree_id": "16f247b29cd1e316adb0c9762a2f4ea2391a5d35",
          "url": "https://github.com/carlrannaberg/autoagent/commit/ab3bc447547d5070ae2b312278db4f89a6faaf81"
        },
        "date": 1752511623370,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4177.469068746154,
            "unit": "ops/s",
            "extra": {
              "mean": 0.23937939061752161,
              "min": 0.1682739999999967,
              "max": 1.5048600000000079,
              "p75": 0.25528700000006666,
              "p99": 0.34727299999997285,
              "p995": 0.5915359999999623,
              "p999": 1.0200949999999693
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10353.132345390679,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09658912555534077,
              "min": 0.07548100000008162,
              "max": 2.760823999999957,
              "p75": 0.10102800000004208,
              "p99": 0.14582199999995282,
              "p995": 0.1639749999999367,
              "p999": 0.4487770000000637
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4401.624140912971,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2271888666515227,
              "min": 0.14784499999996115,
              "max": 2.6784690000001774,
              "p75": 0.24744200000009187,
              "p99": 0.29997999999977765,
              "p995": 0.3243560000000798,
              "p999": 0.761511000000155
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 8678.454211092594,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11522789377880496,
              "min": 0.0759619999998904,
              "max": 0.5114349999998922,
              "p75": 0.13186700000005658,
              "p99": 0.17149000000017622,
              "p995": 0.18773099999998522,
              "p999": 0.41935299999931885
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6349.992824508112,
            "unit": "ops/s",
            "extra": {
              "mean": 0.15748049291338573,
              "min": 0.1416569999999524,
              "max": 0.6374810000000366,
              "p75": 0.15951999999998634,
              "p99": 0.28796299999999064,
              "p995": 0.37071800000001076,
              "p999": 0.4840719999999692
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 13.39663879270455,
            "unit": "ops/s",
            "extra": {
              "mean": 74.64558950000004,
              "min": 72.66898399999991,
              "max": 76.2255630000002,
              "p75": 75.40941299999997,
              "p99": 76.2255630000002,
              "p995": 76.2255630000002,
              "p999": 76.2255630000002
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1773.4468264658854,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5638736865839921,
              "min": 0.3610900000003312,
              "max": 3.089339000000109,
              "p75": 0.6654529999996157,
              "p99": 1.5502599999999802,
              "p995": 1.6807260000000497,
              "p999": 3.089339000000109
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 615.7275294851082,
            "unit": "ops/s",
            "extra": {
              "mean": 1.6240949967532443,
              "min": 1.0324849999999515,
              "max": 6.563673999999992,
              "p75": 1.702436999999918,
              "p99": 2.8590250000002015,
              "p995": 3.7544829999999365,
              "p999": 6.563673999999992
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 831147.4697278006,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001203155921689202,
              "min": 0.0010209999998096464,
              "max": 0.11216300000000956,
              "p75": 0.0011520000000473374,
              "p99": 0.0028260000001409935,
              "p995": 0.0037670000001526205,
              "p999": 0.010238999999955922
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 498060.79967348854,
            "unit": "ops/s",
            "extra": {
              "mean": 0.002007787002421322,
              "min": 0.0017329999999446954,
              "max": 0.4263930000000187,
              "p75": 0.0018939999999929569,
              "p99": 0.004118000000005395,
              "p995": 0.005510999999955857,
              "p999": 0.012552999999968506
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1878655.9022929652,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005322954559051847,
              "min": 0.0004899999912595376,
              "max": 2.864897999999812,
              "p75": 0.0005010000022593886,
              "p99": 0.0009109999955398962,
              "p995": 0.0012320000096224248,
              "p999": 0.003807000000961125
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1384564.3440670923,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007222488462056933,
              "min": 0.0006709999870508909,
              "max": 0.4226889999990817,
              "p75": 0.0006819999980507419,
              "p99": 0.001193000003695488,
              "p995": 0.0015330000023823231,
              "p999": 0.004558999993605539
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 286446.6697420699,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003491051234425058,
              "min": 0.0031860000017331913,
              "max": 0.055232999999134336,
              "p75": 0.0033570000014151447,
              "p99": 0.00676200000452809,
              "p995": 0.009096999994653743,
              "p999": 0.014887999997881707
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 278354.77468205336,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003592537620891308,
              "min": 0.0031860000017331913,
              "max": 0.2550570000021253,
              "p75": 0.003367000004800502,
              "p99": 0.00768400000379188,
              "p995": 0.011101000003691297,
              "p999": 0.017603000000235625
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 40473.95048006081,
            "unit": "ops/s",
            "extra": {
              "mean": 0.024707249678843246,
              "min": 0.02264199999626726,
              "max": 2.884074999994482,
              "p75": 0.024485999994794838,
              "p99": 0.0399840000027325,
              "p995": 0.042849999997997656,
              "p999": 0.054151000003912486
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 11851.511071844421,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08437742613055438,
              "min": 0.08071100000233855,
              "max": 0.585984000004828,
              "p75": 0.0836669999989681,
              "p99": 0.10431499998958316,
              "p995": 0.11999399999331217,
              "p999": 0.37512000001152046
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9985148173483489,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.4873917000001,
              "min": 999.9822810000005,
              "max": 1002.3007959999995,
              "p75": 1001.9302500000013,
              "p99": 1002.3007959999995,
              "p995": 1002.3007959999995,
              "p999": 1002.3007959999995
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328626548101588,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.2420967000003,
              "min": 3003.0202870000066,
              "max": 3005.536272999998,
              "p75": 3004.640769999998,
              "p99": 3005.536272999998,
              "p995": 3005.536272999998,
              "p999": 3005.536272999998
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.188422052711234,
            "unit": "ops/s",
            "extra": {
              "mean": 98.15062576190498,
              "min": 94.39337399999931,
              "max": 99.57700099999784,
              "p75": 99.0349389999974,
              "p99": 99.57700099999784,
              "p995": 99.57700099999784,
              "p999": 99.57700099999784
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2546373.9185158336,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00039271530105164403,
              "min": 0.00030999999989944627,
              "max": 0.38514599999996335,
              "p75": 0.0003510000000233049,
              "p99": 0.0010730000000194195,
              "p995": 0.0013519999999971333,
              "p999": 0.003866999999956988
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
        "date": 1752531151730,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4854.94566116066,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20597552883031287,
              "min": 0.15024100000005092,
              "max": 0.9043219999999792,
              "p75": 0.2109850000000506,
              "p99": 0.30653300000005856,
              "p995": 0.419954999999959,
              "p999": 0.8378880000000208
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9604.213616267392,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10412096606287717,
              "min": 0.08082100000001446,
              "max": 0.41620899999998073,
              "p75": 0.11343299999998635,
              "p99": 0.14836800000000494,
              "p995": 0.1565530000000308,
              "p999": 0.3902909999999338
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4642.577284053193,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21539759896618288,
              "min": 0.153016000000207,
              "max": 3.873729999999796,
              "p75": 0.23153299999967203,
              "p99": 0.27304099999992104,
              "p995": 0.30254599999989296,
              "p999": 0.7447339999998803
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 8382.404007041541,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11929751884542449,
              "min": 0.07572199999958684,
              "max": 0.5272070000000895,
              "p75": 0.13103499999988344,
              "p99": 0.15322599999990416,
              "p995": 0.1600300000000061,
              "p999": 0.35669700000016746
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6748.323986254808,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14818494222222148,
              "min": 0.1382690000000366,
              "max": 0.49516700000003766,
              "p75": 0.14846799999997984,
              "p99": 0.25540799999998853,
              "p995": 0.3605049999999892,
              "p999": 0.4477789999999686
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 13.804779054373187,
            "unit": "ops/s",
            "extra": {
              "mean": 72.438682,
              "min": 70.21723699999995,
              "max": 78.7949349999999,
              "p75": 73.094788,
              "p99": 78.7949349999999,
              "p995": 78.7949349999999,
              "p999": 78.7949349999999
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1901.3844381964245,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5259325678233483,
              "min": 0.35114700000031007,
              "max": 5.190631999999823,
              "p75": 0.6000939999998991,
              "p99": 1.2214180000000852,
              "p995": 1.3292899999996735,
              "p999": 5.190631999999823
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 704.6816041399984,
            "unit": "ops/s",
            "extra": {
              "mean": 1.419080609065156,
              "min": 0.9756869999998798,
              "max": 5.83405700000003,
              "p75": 1.6107770000000983,
              "p99": 2.9247080000000096,
              "p995": 4.406793999999991,
              "p999": 5.83405700000003
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 895117.2534723767,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011171720756367478,
              "min": 0.0010220000001481822,
              "max": 0.41909499999997024,
              "p75": 0.00112200000012308,
              "p99": 0.001211999999895852,
              "p995": 0.001393000000007305,
              "p999": 0.009898000000021057
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 515648.6954088196,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019393048191602119,
              "min": 0.0017329999999446954,
              "max": 1.207550000000083,
              "p75": 0.001844000000005508,
              "p99": 0.0037269999999693937,
              "p995": 0.004007000000001426,
              "p999": 0.012183000000050015
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1908552.973199625,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005239571623330599,
              "min": 0.0004999999946448952,
              "max": 0.38007199999992736,
              "p75": 0.0005110000056447461,
              "p99": 0.0007409999961964786,
              "p995": 0.0008420000085607171,
              "p999": 0.0010110000002896413
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1409625.9898881041,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007094080324663849,
              "min": 0.0006709999870508909,
              "max": 0.24120200000470504,
              "p75": 0.0006819999980507419,
              "p99": 0.0008210000087274238,
              "p995": 0.0009319999953731894,
              "p999": 0.0013430000108201057
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 294045.18824428844,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034008378303038737,
              "min": 0.003196000005118549,
              "max": 0.11980400000174996,
              "p75": 0.003356000001076609,
              "p99": 0.0038480000002891757,
              "p995": 0.006492000000434928,
              "p999": 0.01429699999425793
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 297443.6359302168,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003361981495662626,
              "min": 0.003165999994962476,
              "max": 0.15982899999653455,
              "p75": 0.003316000002087094,
              "p99": 0.004938999998557847,
              "p995": 0.0066829999996116385,
              "p999": 0.013395000001764856
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41742.09514122023,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023956631707556582,
              "min": 0.022511999995913357,
              "max": 4.317911999998614,
              "p75": 0.02323400000750553,
              "p99": 0.04004500000155531,
              "p995": 0.04861100000562146,
              "p999": 0.06275699999241624
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12470.654026642453,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0801882561943895,
              "min": 0.07832699999562465,
              "max": 0.3139369999989867,
              "p75": 0.0792280000023311,
              "p99": 0.09171200000855606,
              "p995": 0.10342400000081398,
              "p999": 0.2120170000125654
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.998589663358633,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.4123285000002,
              "min": 999.9115260000008,
              "max": 1002.261833999999,
              "p75": 1001.7655990000003,
              "p99": 1002.261833999999,
              "p995": 1002.261833999999,
              "p999": 1002.261833999999
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33288845364731107,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.009268100001,
              "min": 3003.391521000005,
              "max": 3004.6011140000046,
              "p75": 3004.4606300000014,
              "p99": 3004.6011140000046,
              "p995": 3004.6011140000046,
              "p999": 3004.6011140000046
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.105956794296524,
            "unit": "ops/s",
            "extra": {
              "mean": 98.95154119047567,
              "min": 97.70499700000073,
              "max": 99.90383000000293,
              "p75": 99.62828199999785,
              "p99": 99.90383000000293,
              "p995": 99.90383000000293,
              "p999": 99.90383000000293
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2626018.25632437,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003808046640923575,
              "min": 0.0003100000000131331,
              "max": 4.139517000000069,
              "p75": 0.0003510000000233049,
              "p99": 0.0007120000000213622,
              "p995": 0.0009719999999333595,
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
          "id": "0fbd330835aadddd1d032cf93d380e48b169ce2b",
          "message": "chore: prepare release v0.6.5\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-15T02:25:46+03:00",
          "tree_id": "cd2c391d72a7940044b8be6c330edaef47e581aa",
          "url": "https://github.com/carlrannaberg/autoagent/commit/0fbd330835aadddd1d032cf93d380e48b169ce2b"
        },
        "date": 1752535816738,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4553.70550275771,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21960137725076934,
              "min": 0.1654720000000225,
              "max": 0.7411420000000817,
              "p75": 0.2488689999999565,
              "p99": 0.3167569999999955,
              "p995": 0.4029199999999946,
              "p999": 0.6544910000000073
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9523.967237552768,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10499826123477458,
              "min": 0.07682499999987158,
              "max": 0.3587070000000949,
              "p75": 0.1229120000000421,
              "p99": 0.15013399999998,
              "p995": 0.16341799999986506,
              "p999": 0.2749589999998534
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4816.808459611541,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20760634523562652,
              "min": 0.13850900000034017,
              "max": 2.9725640000001476,
              "p75": 0.22790600000007544,
              "p99": 0.27817099999992934,
              "p995": 0.30414699999982986,
              "p999": 0.5750960000000305
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9914.151328029959,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10086592053247487,
              "min": 0.07382899999993242,
              "max": 0.4035039999998844,
              "p75": 0.10741100000041115,
              "p99": 0.14621299999998882,
              "p995": 0.15836699999999837,
              "p999": 0.3109220000001187
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6737.383111727516,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14842558058771166,
              "min": 0.14032499999996162,
              "max": 0.4213550000000055,
              "p75": 0.15120500000000447,
              "p99": 0.19129999999995562,
              "p995": 0.2710910000000126,
              "p999": 0.3257049999999708
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.05207054884737,
            "unit": "ops/s",
            "extra": {
              "mean": 71.16388980000002,
              "min": 69.31431900000007,
              "max": 74.30896800000005,
              "p75": 71.37575700000002,
              "p99": 74.30896800000005,
              "p995": 74.30896800000005,
              "p999": 74.30896800000005
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1725.9358573197903,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5793958076477432,
              "min": 0.34992000000011103,
              "max": 2.1792100000002392,
              "p75": 0.6500959999998486,
              "p99": 1.228556000000026,
              "p995": 1.260106000000178,
              "p999": 2.1792100000002392
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 665.023989512227,
            "unit": "ops/s",
            "extra": {
              "mean": 1.503705153153147,
              "min": 0.9529469999999947,
              "max": 3.9347799999998188,
              "p75": 1.6090139999998883,
              "p99": 2.554106999999931,
              "p995": 2.734237000000121,
              "p999": 3.9347799999998188
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 931484.3214653537,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0010735553749598938,
              "min": 0.0010209999998096464,
              "max": 0.2443510000000515,
              "p75": 0.0010720000000219443,
              "p99": 0.0011320000000978325,
              "p995": 0.0011630000001332519,
              "p999": 0.009246999999959371
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 500726.5669205431,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019970979493857837,
              "min": 0.0018129999999700885,
              "max": 1.3012640000000602,
              "p75": 0.0019340000000056534,
              "p99": 0.0036870000000135406,
              "p995": 0.004036999999982527,
              "p999": 0.01292399999999816
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1906986.0510715009,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005243876846598422,
              "min": 0.0004999999946448952,
              "max": 2.7704549999907613,
              "p75": 0.0005110000056447461,
              "p99": 0.0006010000070091337,
              "p995": 0.0008419999940088019,
              "p999": 0.0010119999933522195
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1414713.8896612346,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007068567060152768,
              "min": 0.0006709999870508909,
              "max": 0.27882099999987986,
              "p75": 0.0006819999980507419,
              "p99": 0.0008420000085607171,
              "p995": 0.0009520000021439046,
              "p999": 0.001352999999653548
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 294281.83932217694,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033981029964448794,
              "min": 0.0032260000007227063,
              "max": 0.04854700000578305,
              "p75": 0.003386000003956724,
              "p99": 0.0035359999965294264,
              "p995": 0.004187999998976011,
              "p999": 0.012413000004016794
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 302660.3777400023,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033040334102108376,
              "min": 0.0031359999993583187,
              "max": 0.1401819999955478,
              "p75": 0.0032659999997122213,
              "p99": 0.0039670000041951425,
              "p995": 0.005880999997316394,
              "p999": 0.013274999997520354
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42934.115363917546,
            "unit": "ops/s",
            "extra": {
              "mean": 0.02329150121118868,
              "min": 0.022391000005882233,
              "max": 0.21484100000816397,
              "p75": 0.022993000005953945,
              "p99": 0.033372999998391606,
              "p995": 0.040776000008918345,
              "p999": 0.04731900000479072
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 11786.587934996689,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08484219568165305,
              "min": 0.08181300001160707,
              "max": 0.32289399999717716,
              "p75": 0.083796999999322,
              "p99": 0.10156999999890104,
              "p995": 0.111218000005465,
              "p999": 0.20986199998878874
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9984521984035823,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.5502010000002,
              "min": 1000.8493000000017,
              "max": 1002.0370320000002,
              "p75": 1001.8266170000006,
              "p99": 1002.0370320000002,
              "p995": 1002.0370320000002,
              "p999": 1002.0370320000002
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33285629096448555,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.2995344999986,
              "min": 3003.522398000001,
              "max": 3004.6780199999994,
              "p75": 3004.5489359999992,
              "p99": 3004.6780199999994,
              "p995": 3004.6780199999994,
              "p999": 3004.6780199999994
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.113702276845046,
            "unit": "ops/s",
            "extra": {
              "mean": 98.87576009523868,
              "min": 96.82304799999838,
              "max": 99.80315600000176,
              "p75": 99.49004100000457,
              "p99": 99.80315600000176,
              "p995": 99.80315600000176,
              "p999": 99.80315600000176
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2602296.5323046246,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038427596070859314,
              "min": 0.00031999999998788553,
              "max": 0.22173500000002377,
              "p75": 0.0003700000000321779,
              "p99": 0.000611000000048989,
              "p995": 0.0006910000000743821,
              "p999": 0.001061999999933505
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
        "date": 1752563545977,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4309.333173784658,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2320544640371246,
              "min": 0.16898800000001302,
              "max": 0.825631000000044,
              "p75": 0.24943800000005467,
              "p99": 0.3113749999999982,
              "p995": 0.44481599999994614,
              "p999": 0.7640260000000012
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9498.076354595916,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10528447684210512,
              "min": 0.07854700000007142,
              "max": 0.9151100000001406,
              "p75": 0.12810100000001512,
              "p99": 0.15526199999999335,
              "p995": 0.18343400000003385,
              "p999": 0.43004800000016985
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4652.992043383568,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21491547603696715,
              "min": 0.14110500000015236,
              "max": 2.740606999999727,
              "p75": 0.23244700000032026,
              "p99": 0.26808400000027177,
              "p995": 0.27720099999987724,
              "p999": 0.7120480000003226
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9463.16506494668,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10567288989855897,
              "min": 0.0746700000004239,
              "max": 0.4032779999997729,
              "p75": 0.11391299999968396,
              "p99": 0.14915100000007442,
              "p995": 0.15654399999993984,
              "p999": 0.3803939999997965
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6678.37222691015,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14973708652694628,
              "min": 0.14152599999999893,
              "max": 0.47032299999995075,
              "p75": 0.1516749999999547,
              "p99": 0.19646899999997913,
              "p995": 0.3133589999999913,
              "p999": 0.42934600000000955
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.057761695236056,
            "unit": "ops/s",
            "extra": {
              "mean": 71.13507979999999,
              "min": 70.00654599999984,
              "max": 75.30960300000004,
              "p75": 71.44640299999992,
              "p99": 75.30960300000004,
              "p995": 75.30960300000004,
              "p999": 75.30960300000004
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1615.9536092038197,
            "unit": "ops/s",
            "extra": {
              "mean": 0.6188296460395915,
              "min": 0.3847129999999197,
              "max": 2.9614950000000135,
              "p75": 0.646675999999843,
              "p99": 1.3860829999998714,
              "p995": 1.459342000000106,
              "p999": 2.9614950000000135
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 724.3718597943588,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3805064159779605,
              "min": 0.9664049999998952,
              "max": 6.936397999999826,
              "p75": 1.5959270000000743,
              "p99": 2.5034820000000764,
              "p995": 3.122032999999874,
              "p999": 6.936397999999826
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 880789.1702966719,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011353454762201207,
              "min": 0.0010219999999208085,
              "max": 0.396253999999999,
              "p75": 0.001142000000072585,
              "p99": 0.0012229999999817665,
              "p995": 0.0012619999999969878,
              "p999": 0.00938799999994444
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 517339.54887992726,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019329664669269207,
              "min": 0.001692999999931999,
              "max": 0.281579000000022,
              "p75": 0.001853000000096472,
              "p99": 0.003746999999975742,
              "p995": 0.003977000000020325,
              "p999": 0.011612000000013722
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1875706.8520401595,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005331323489661111,
              "min": 0.0004999999946448952,
              "max": 2.6272029999963706,
              "p75": 0.0005110000056447461,
              "p99": 0.0008119999984046444,
              "p995": 0.0008519999973941594,
              "p999": 0.0011620000004768372
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1406982.640847368,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007107408229270981,
              "min": 0.0006709999870508909,
              "max": 0.32397800000035204,
              "p75": 0.0006819999980507419,
              "p99": 0.0008320000051753595,
              "p995": 0.0009710000013001263,
              "p999": 0.0015629999979864806
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 293552.84575068695,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034065416652417514,
              "min": 0.003235000003769528,
              "max": 0.4246579999962705,
              "p75": 0.003377000000909902,
              "p99": 0.004278000000340398,
              "p995": 0.0057710000037332065,
              "p999": 0.012604000003193505
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 293243.90741210396,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034101305252172615,
              "min": 0.0032159999973373488,
              "max": 0.16808600000513252,
              "p75": 0.003365999997186009,
              "p99": 0.004457999995793216,
              "p995": 0.005990999998175539,
              "p999": 0.013465999996697064
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 38991.225868257854,
            "unit": "ops/s",
            "extra": {
              "mean": 0.02564679559906026,
              "min": 0.022862999991048127,
              "max": 2.325817000004463,
              "p75": 0.02347400000144262,
              "p99": 0.11119900000630878,
              "p995": 0.11881300000823103,
              "p999": 0.16981900000246242
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12253.495251778479,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08160936773161596,
              "min": 0.07912900000519585,
              "max": 0.4414779999933671,
              "p75": 0.08064200000080746,
              "p99": 0.10047899998608045,
              "p995": 0.1166489999886835,
              "p999": 0.3081289999972796
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9989247329438039,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.0764244999995,
              "min": 1000.0098900000003,
              "max": 1001.9851280000003,
              "p75": 1001.8026059999993,
              "p99": 1001.9851280000003,
              "p995": 1001.9851280000003,
              "p999": 1001.9851280000003
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328696214403671,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.1792209000005,
              "min": 3003.3928559999986,
              "max": 3004.5834599999944,
              "p75": 3004.4637820000025,
              "p99": 3004.5834599999944,
              "p995": 3004.5834599999944,
              "p999": 3004.5834599999944
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.141570563691161,
            "unit": "ops/s",
            "extra": {
              "mean": 98.60405680952404,
              "min": 97.47727099999611,
              "max": 100.35398200000054,
              "p75": 98.74849900000117,
              "p99": 100.35398200000054,
              "p995": 100.35398200000054,
              "p999": 100.35398200000054
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2538568.0300711533,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00039392286838654117,
              "min": 0.00031999999998788553,
              "max": 0.2871900000000096,
              "p75": 0.00037999999995008693,
              "p99": 0.0006210000000237414,
              "p995": 0.0007309999999733918,
              "p999": 0.0011629999999058782
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
        "date": 1752564607550,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4241.877850885396,
            "unit": "ops/s",
            "extra": {
              "mean": 0.23574464780763846,
              "min": 0.16867600000000493,
              "max": 1.3398900000000822,
              "p75": 0.2585149999999885,
              "p99": 0.30624600000010105,
              "p995": 0.4386210000000119,
              "p999": 0.8070010000000138
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10493.498431761753,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09529710291595384,
              "min": 0.07604299999991326,
              "max": 0.6272550000001047,
              "p75": 0.10508699999991222,
              "p99": 0.1354989999999816,
              "p995": 0.15328699999986384,
              "p999": 0.33216200000003937
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4632.722585622454,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21585579138787125,
              "min": 0.1428579999997055,
              "max": 2.8055970000000343,
              "p75": 0.23489000000017768,
              "p99": 0.27462500000001455,
              "p995": 0.29741699999976845,
              "p999": 0.7188070000001971
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10733.534229015722,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09316595807713758,
              "min": 0.07365799999979572,
              "max": 0.4165699999998651,
              "p75": 0.09696200000007593,
              "p99": 0.1275590000000193,
              "p995": 0.1355239999998048,
              "p999": 0.31283399999983885
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6793.493449954411,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14719967088607566,
              "min": 0.137499000000048,
              "max": 0.5296559999999886,
              "p75": 0.14866999999992458,
              "p99": 0.24856799999997747,
              "p995": 0.27741100000002916,
              "p999": 0.4220870000000332
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.033424743694097,
            "unit": "ops/s",
            "extra": {
              "mean": 71.25844319999997,
              "min": 70.35760800000003,
              "max": 71.90949899999998,
              "p75": 71.57261900000003,
              "p99": 71.90949899999998,
              "p995": 71.90949899999998,
              "p999": 71.90949899999998
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 2016.094576918759,
            "unit": "ops/s",
            "extra": {
              "mean": 0.4960084767096203,
              "min": 0.35173200000008364,
              "max": 1.2657050000002528,
              "p75": 0.48194699999976365,
              "p99": 1.1473959999998442,
              "p995": 1.2425579999999172,
              "p999": 1.2579879999998411
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 653.5815940566087,
            "unit": "ops/s",
            "extra": {
              "mean": 1.5300308470947959,
              "min": 0.9327659999999014,
              "max": 4.802447999999913,
              "p75": 1.5985089999999218,
              "p99": 2.6164929999999913,
              "p995": 3.670808999999963,
              "p999": 4.802447999999913
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 917415.5724844246,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0010900185586472345,
              "min": 0.001011999999946056,
              "max": 2.543276999999989,
              "p75": 0.0010720000000219443,
              "p99": 0.0017640000000938016,
              "p995": 0.002103999999917505,
              "p999": 0.009667000000035841
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 534271.6505863336,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0018717070218914954,
              "min": 0.0017429999999194479,
              "max": 1.2213480000000345,
              "p75": 0.0018329999999195934,
              "p99": 0.0034660000000030777,
              "p995": 0.0035870000000386426,
              "p999": 0.010989999999992506
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1855269.5064507632,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005390052477675102,
              "min": 0.0004999999946448952,
              "max": 0.5371639999939362,
              "p75": 0.0005110000056447461,
              "p99": 0.0008120000129565597,
              "p995": 0.0008609999931650236,
              "p999": 0.0015429999912157655
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1407922.4291298806,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000710266403396966,
              "min": 0.0006709999870508909,
              "max": 0.4078620000072988,
              "p75": 0.0006819999980507419,
              "p99": 0.0008119999984046444,
              "p995": 0.0009209999989252537,
              "p999": 0.001452999989851378
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 289755.8562816243,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034511813249705763,
              "min": 0.003246000000217464,
              "max": 0.10699999999633292,
              "p75": 0.0033970000004046597,
              "p99": 0.00535900000249967,
              "p995": 0.007082999996782746,
              "p999": 0.012743999999656808
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 300121.9771904818,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033319785820460548,
              "min": 0.003125000002910383,
              "max": 0.2194000000017695,
              "p75": 0.003285999999206979,
              "p99": 0.003988000004028436,
              "p995": 0.005630999999993946,
              "p999": 0.013514999998733401
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42088.60535201294,
            "unit": "ops/s",
            "extra": {
              "mean": 0.02375939976239136,
              "min": 0.022652000014204532,
              "max": 2.477937000003294,
              "p75": 0.02333399999770336,
              "p99": 0.03323200000158977,
              "p995": 0.04058600000280421,
              "p999": 0.04556500000762753
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12039.955957835657,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08305678222595121,
              "min": 0.07912699998996686,
              "max": 0.47647999999753665,
              "p75": 0.08062999999674503,
              "p99": 0.1506810000137193,
              "p995": 0.17065899999579415,
              "p999": 0.30327699999907054
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986715219017461,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3302453000002,
              "min": 1000.4100750000007,
              "max": 1002.0109560000001,
              "p75": 1001.7897799999992,
              "p99": 1002.0109560000001,
              "p995": 1002.0109560000001,
              "p999": 1002.0109560000001
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33288474777828886,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.042710500001,
              "min": 3003.5494130000006,
              "max": 3004.5658870000043,
              "p75": 3004.472514000001,
              "p99": 3004.5658870000043,
              "p995": 3004.5658870000043,
              "p999": 3004.5658870000043
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.149027194092232,
            "unit": "ops/s",
            "extra": {
              "mean": 98.53161104761863,
              "min": 96.02893300000142,
              "max": 100.14654999999766,
              "p75": 99.31656600000133,
              "p99": 100.14654999999766,
              "p995": 100.14654999999766,
              "p999": 100.14654999999766
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2514787.446746972,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003976479210175635,
              "min": 0.00031999999998788553,
              "max": 4.051268999999934,
              "p75": 0.00037099999997280975,
              "p99": 0.0007310000000302352,
              "p995": 0.0011620000000220898,
              "p999": 0.0020440000000689906
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
        "date": 1752567256286,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4467.813307953079,
            "unit": "ops/s",
            "extra": {
              "mean": 0.22382313921217722,
              "min": 0.15786400000001777,
              "max": 1.1275909999999385,
              "p75": 0.23818400000004658,
              "p99": 0.35220700000002125,
              "p995": 0.6781140000000505,
              "p999": 0.9502610000000686
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 8114.371364523417,
            "unit": "ops/s",
            "extra": {
              "mean": 0.12323813578117314,
              "min": 0.08141200000000026,
              "max": 0.5680680000000393,
              "p75": 0.1342810000001009,
              "p99": 0.17594800000006217,
              "p995": 0.24884399999996276,
              "p999": 0.40861199999994824
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4642.782701519758,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2153880688132706,
              "min": 0.15120100000012826,
              "max": 3.068759,
              "p75": 0.23253300000010313,
              "p99": 0.282015999999885,
              "p995": 0.30557900000007976,
              "p999": 0.749887999999828
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9991.477325838034,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10008529943955262,
              "min": 0.07894699999997101,
              "max": 0.45819399999982124,
              "p75": 0.10485500000049797,
              "p99": 0.14335699999992357,
              "p995": 0.16464599999972052,
              "p999": 0.3889850000000479
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6713.027094409282,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14896409413166473,
              "min": 0.13956000000007407,
              "max": 0.5688000000000102,
              "p75": 0.15022000000010394,
              "p99": 0.20910999999995283,
              "p995": 0.3562339999999722,
              "p999": 0.49150600000007216
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 13.958993065299266,
            "unit": "ops/s",
            "extra": {
              "mean": 71.63840510000003,
              "min": 70.43597800000009,
              "max": 76.90907300000003,
              "p75": 71.40925100000004,
              "p99": 76.90907300000003,
              "p995": 76.90907300000003,
              "p999": 76.90907300000003
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1848.3955335282565,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5410097470270223,
              "min": 0.3512949999999364,
              "max": 6.840969999999743,
              "p75": 0.5196280000000115,
              "p99": 1.445944000000054,
              "p995": 2.030445000000327,
              "p999": 6.840969999999743
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 667.0286035764973,
            "unit": "ops/s",
            "extra": {
              "mean": 1.499186083832335,
              "min": 0.9612319999998817,
              "max": 5.58236399999987,
              "p75": 1.6110830000000078,
              "p99": 2.6458110000000943,
              "p995": 4.20686099999989,
              "p999": 5.58236399999987
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 895504.5349546227,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011166889289406807,
              "min": 0.001011999999946056,
              "max": 0.05833900000016001,
              "p75": 0.001113000000032116,
              "p99": 0.0013719999999466381,
              "p995": 0.002054000000043743,
              "p999": 0.010168000000021493
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 521145.1098841226,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001918851354514967,
              "min": 0.0017119999999977153,
              "max": 0.4387259999999742,
              "p75": 0.001833999999973912,
              "p99": 0.0035870000000386426,
              "p995": 0.004337999999961539,
              "p999": 0.017001999999934014
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1899708.9209508689,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005263964331438029,
              "min": 0.0004999999946448952,
              "max": 0.5501959999965038,
              "p75": 0.0005110000056447461,
              "p99": 0.0006609999982174486,
              "p995": 0.0008510000043315813,
              "p999": 0.0012720000086119398
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1399341.857264537,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007146216593240634,
              "min": 0.0006709999870508909,
              "max": 0.5815230000007432,
              "p75": 0.0006819999980507419,
              "p99": 0.0009410000056959689,
              "p995": 0.001061999995727092,
              "p999": 0.0018540000019129366
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 290898.3273352284,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034376271914675184,
              "min": 0.0032349999964935705,
              "max": 0.37948799999867333,
              "p75": 0.003396000000066124,
              "p99": 0.005270000001473818,
              "p995": 0.00647200000094017,
              "p999": 0.01288399999612011
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 294167.1945706121,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033994273272370595,
              "min": 0.0031759999983478338,
              "max": 0.2821960000001127,
              "p75": 0.0033459999976912513,
              "p99": 0.005049999999755528,
              "p995": 0.006180999997013714,
              "p999": 0.014257000002544373
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42559.7457480591,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023496380968056046,
              "min": 0.022451999990153126,
              "max": 2.697476999994251,
              "p75": 0.023012999998172745,
              "p99": 0.035405999995418824,
              "p995": 0.04062600000179373,
              "p999": 0.05233800000860356
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12403.734498062624,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08062088076427248,
              "min": 0.07833600000594743,
              "max": 0.4986689999932423,
              "p75": 0.07942800001183059,
              "p99": 0.09443599999940488,
              "p995": 0.1084019999980228,
              "p999": 0.3345229999977164
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9984893350612745,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.5129504999999,
              "min": 1000.8360219999995,
              "max": 1002.0598499999996,
              "p75": 1001.8394319999989,
              "p99": 1002.0598499999996,
              "p995": 1002.0598499999996,
              "p999": 1002.0598499999996
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33287815462401077,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.102210099999,
              "min": 3001.8200320000033,
              "max": 3004.754289999997,
              "p75": 3004.598156,
              "p99": 3004.754289999997,
              "p995": 3004.754289999997,
              "p999": 3004.754289999997
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.194505182969264,
            "unit": "ops/s",
            "extra": {
              "mean": 98.09205861904705,
              "min": 93.66053500000271,
              "max": 99.93132000000332,
              "p75": 99.06556799999817,
              "p99": 99.93132000000332,
              "p995": 99.93132000000332,
              "p999": 99.93132000000332
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2537008.619867241,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00039416499895547413,
              "min": 0.0003100000000131331,
              "max": 0.3462849999999662,
              "p75": 0.0003609999999980573,
              "p99": 0.0006109999999921456,
              "p995": 0.0008719999999584616,
              "p999": 0.0013429999999061693
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
        "date": 1752675589412,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4613.683787340607,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21674654052882422,
              "min": 0.1672520000000759,
              "max": 0.760389000000032,
              "p75": 0.23030999999997448,
              "p99": 0.3312779999999975,
              "p995": 0.4619910000000118,
              "p999": 0.7170279999999138
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9161.180862174473,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10915623379174753,
              "min": 0.07814600000006067,
              "max": 0.4834120000000439,
              "p75": 0.12397099999998318,
              "p99": 0.1512319999999363,
              "p995": 0.15804000000002816,
              "p999": 0.3638290000001234
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4488.670316142655,
            "unit": "ops/s",
            "extra": {
              "mean": 0.22278312497215244,
              "min": 0.14326699999992343,
              "max": 2.7194640000000163,
              "p75": 0.23234399999955713,
              "p99": 0.5628200000001016,
              "p995": 0.6621249999998327,
              "p999": 0.8664459999999963
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9351.66764173209,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10693279940119671,
              "min": 0.07529100000010658,
              "max": 0.5102120000001378,
              "p75": 0.1146839999992153,
              "p99": 0.1558300000001509,
              "p995": 0.18131799999991927,
              "p999": 0.3755710000000363
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6784.972293816576,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14738453698791681,
              "min": 0.13755600000001778,
              "max": 0.4706979999999703,
              "p75": 0.1505010000000766,
              "p99": 0.2515300000000025,
              "p995": 0.28827799999999115,
              "p999": 0.42719799999997576
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.053191602848692,
            "unit": "ops/s",
            "extra": {
              "mean": 71.15821290000004,
              "min": 69.86251700000003,
              "max": 74.54573500000004,
              "p75": 71.47807399999999,
              "p99": 74.54573500000004,
              "p995": 74.54573500000004,
              "p999": 74.54573500000004
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1817.3610667350501,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5502483894389426,
              "min": 0.3552429999999731,
              "max": 2.0934830000001057,
              "p75": 0.6505240000001322,
              "p99": 1.3257340000000113,
              "p995": 1.4400770000002012,
              "p999": 2.0934830000001057
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 660.1143385042868,
            "unit": "ops/s",
            "extra": {
              "mean": 1.5148890755287026,
              "min": 0.953789999999799,
              "max": 4.369684000000007,
              "p75": 1.638778000000002,
              "p99": 2.796538000000055,
              "p995": 3.1324950000000626,
              "p999": 4.369684000000007
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 879936.4249137624,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011364457382225135,
              "min": 0.0010519999998450658,
              "max": 0.35812799999985145,
              "p75": 0.0011320000000978325,
              "p99": 0.0012319999998453568,
              "p995": 0.0019839999999931024,
              "p999": 0.00969800000007126
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 534082.4735922803,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001872369997977882,
              "min": 0.0017129999999951906,
              "max": 0.2482439999999997,
              "p75": 0.001822999999944841,
              "p99": 0.0035269999999627544,
              "p995": 0.0037570000000641812,
              "p999": 0.011370999999996911
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1886747.9396630328,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005300125040436492,
              "min": 0.0004999999946448952,
              "max": 0.6080249999940861,
              "p75": 0.0005110000056447461,
              "p99": 0.0008120000129565597,
              "p995": 0.0008519999973941594,
              "p999": 0.0013029999972786754
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1310504.6265711964,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007630648375629161,
              "min": 0.0006709999870508909,
              "max": 3.582643999994616,
              "p75": 0.000690999993821606,
              "p99": 0.0010820000024978071,
              "p995": 0.0011020000092685223,
              "p999": 0.01008900000306312
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 290485.73449482437,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034425098421410334,
              "min": 0.003214999996998813,
              "max": 0.3466370000023744,
              "p75": 0.003367000004800502,
              "p99": 0.005650999999488704,
              "p995": 0.007725000003119931,
              "p999": 0.013134000000718515
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 295533.8392291844,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033837072688806613,
              "min": 0.003165999994962476,
              "max": 0.23749300000054063,
              "p75": 0.003325999998196494,
              "p99": 0.005049999999755528,
              "p995": 0.006320999993477017,
              "p999": 0.014286000005085953
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42469.15851606229,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023546499034629784,
              "min": 0.022501999992528,
              "max": 2.577428000004147,
              "p75": 0.023132000002078712,
              "p99": 0.0330509999912465,
              "p995": 0.03666799998609349,
              "p999": 0.050694000005023554
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12419.475924855074,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08051869547882466,
              "min": 0.07826600001135375,
              "max": 0.48672800000349525,
              "p75": 0.07930800000031013,
              "p99": 0.09771299999556504,
              "p995": 0.1085330000059912,
              "p999": 0.3193860000028508
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9985277234941189,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.4744473000001,
              "min": 1000.531992000002,
              "max": 1001.9580280000009,
              "p75": 1001.8321649999998,
              "p99": 1001.9580280000009,
              "p995": 1001.9580280000009,
              "p999": 1001.9580280000009
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328740182066991,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.1395402000016,
              "min": 3003.530673000001,
              "max": 3004.744224000002,
              "p75": 3004.4981719999996,
              "p99": 3004.744224000002,
              "p995": 3004.744224000002,
              "p999": 3004.744224000002
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.134390423736892,
            "unit": "ops/s",
            "extra": {
              "mean": 98.67391704761914,
              "min": 96.41470700000355,
              "max": 99.47034799999528,
              "p75": 99.10569700000633,
              "p99": 99.47034799999528,
              "p995": 99.47034799999528,
              "p999": 99.47034799999528
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2655002.8583489005,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00037664742877974996,
              "min": 0.00030999999989944627,
              "max": 2.7884930000000168,
              "p75": 0.0003510000000233049,
              "p99": 0.0006710000000111904,
              "p995": 0.0007520000000340588,
              "p999": 0.001573000000007596
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
        "date": 1752676720364,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4545.9788941515,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21997462445030744,
              "min": 0.16014899999998988,
              "max": 0.7659850000000006,
              "p75": 0.2343069999999443,
              "p99": 0.3017409999999927,
              "p995": 0.35534100000006674,
              "p999": 0.6612480000000005
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10363.82749302561,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0964894485819023,
              "min": 0.07601099999988037,
              "max": 0.6658299999999144,
              "p75": 0.10726899999986017,
              "p99": 0.148729000000003,
              "p995": 0.1563659999999345,
              "p999": 0.27454099999999926
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4918.076932268019,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20333150818339077,
              "min": 0.13839699999971344,
              "max": 2.6440699999998287,
              "p75": 0.2175240000001395,
              "p99": 0.26315999999997075,
              "p995": 0.27132399999982226,
              "p999": 0.5748790000002373
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10006.478715041423,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09993525479615836,
              "min": 0.0757210000001578,
              "max": 0.33805900000015754,
              "p75": 0.10729999999966822,
              "p99": 0.1415340000003198,
              "p995": 0.148656000000301,
              "p999": 0.28427899999996953
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6857.323003929146,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14582950218722593,
              "min": 0.1378189999999222,
              "max": 0.43921499999999014,
              "p75": 0.14845900000000256,
              "p99": 0.20261099999993348,
              "p995": 0.26056900000003225,
              "p999": 0.3423530000000028
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.12201784660685,
            "unit": "ops/s",
            "extra": {
              "mean": 70.81141029999999,
              "min": 68.8279419999999,
              "max": 76.84989800000005,
              "p75": 70.41912500000012,
              "p99": 76.84989800000005,
              "p995": 76.84989800000005,
              "p999": 76.84989800000005
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1937.0882900254096,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5162387306501567,
              "min": 0.3578449999999975,
              "max": 4.249214999999822,
              "p75": 0.6048590000000331,
              "p99": 1.1262460000002648,
              "p995": 1.2114919999999074,
              "p999": 4.249214999999822
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 692.9578343804774,
            "unit": "ops/s",
            "extra": {
              "mean": 1.443089247838617,
              "min": 0.9561370000001261,
              "max": 5.0055459999998675,
              "p75": 1.6072699999999713,
              "p99": 2.6192509999998492,
              "p995": 2.833705999999893,
              "p999": 5.0055459999998675
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 907691.7113538844,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011016956390495528,
              "min": 0.00102100000003702,
              "max": 0.27735600000005434,
              "p75": 0.0011019999999462016,
              "p99": 0.0011719999999968422,
              "p995": 0.0012030000000322616,
              "p999": 0.009898000000021057
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 510875.5677992755,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019574238093000816,
              "min": 0.0017329999999446954,
              "max": 1.2992669999999862,
              "p75": 0.0018629999999575375,
              "p99": 0.0038470000000074833,
              "p995": 0.004096000000004096,
              "p999": 0.011932999999999083
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1890818.3625740488,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005288715298060988,
              "min": 0.0004999999946448952,
              "max": 0.4961250000051223,
              "p75": 0.0005110000056447461,
              "p99": 0.0008010000019567087,
              "p995": 0.0008510000043315813,
              "p999": 0.001233000002685003
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1406651.1784987715,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007109083014221306,
              "min": 0.0006609999982174486,
              "max": 0.53268200000457,
              "p75": 0.0006819999980507419,
              "p99": 0.0009109999955398962,
              "p995": 0.0010119999933522195,
              "p999": 0.0016529999993508682
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 295631.67184935696,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003382587507435818,
              "min": 0.003236000004108064,
              "max": 0.030937000003177673,
              "p75": 0.0033660000044619665,
              "p99": 0.0036069999987375923,
              "p995": 0.004088000001502223,
              "p999": 0.01231299999926705
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 296143.63337491965,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033767398225103625,
              "min": 0.003166000002238434,
              "max": 0.1925180000034743,
              "p75": 0.0033359999943058938,
              "p99": 0.003978000000643078,
              "p995": 0.005911000000196509,
              "p999": 0.013293999996676575
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41811.742523329536,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023916726250814202,
              "min": 0.02254200000606943,
              "max": 3.2592939999885857,
              "p75": 0.023102999999537133,
              "p99": 0.04504399999859743,
              "p995": 0.0485599999956321,
              "p999": 0.06540099999983795
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12416.909182727835,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08053533977610303,
              "min": 0.07836600000155158,
              "max": 0.49227000000246335,
              "p75": 0.07949800000642426,
              "p99": 0.09223199999541976,
              "p995": 0.10261099999479484,
              "p999": 0.31644899999082554
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986534119444508,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3484038000004,
              "min": 1000.0430070000002,
              "max": 1002.0545500000007,
              "p75": 1001.8629490000003,
              "p99": 1002.0545500000007,
              "p995": 1002.0545500000007,
              "p999": 1002.0545500000007
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328639987122712,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.2299673999996,
              "min": 3003.5934109999944,
              "max": 3004.4887429999944,
              "p75": 3004.467027999999,
              "p99": 3004.4887429999944,
              "p995": 3004.4887429999944,
              "p999": 3004.4887429999944
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.144740510344286,
            "unit": "ops/s",
            "extra": {
              "mean": 98.57324580952367,
              "min": 95.52402399999846,
              "max": 99.87976799999888,
              "p75": 99.37087099999917,
              "p99": 99.87976799999888,
              "p995": 99.87976799999888,
              "p999": 99.87976799999888
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2641356.917043401,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003785932879981054,
              "min": 0.0003100000000131331,
              "max": 3.8276619999999184,
              "p75": 0.0003600000000005821,
              "p99": 0.0006720000000086657,
              "p995": 0.000841000000036729,
              "p999": 0.0020440000000689906
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
        "date": 1752691137423,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4173.460104507041,
            "unit": "ops/s",
            "extra": {
              "mean": 0.23960933493052225,
              "min": 0.16784500000005664,
              "max": 1.6462679999999636,
              "p75": 0.26088900000002013,
              "p99": 0.3172040000000038,
              "p995": 0.457587999999987,
              "p999": 0.9817809999999554
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 8545.907772563356,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11701507044231169,
              "min": 0.07829700000002049,
              "max": 1.130158000000165,
              "p75": 0.1285609999999906,
              "p99": 0.15053199999988465,
              "p995": 0.161783000000014,
              "p999": 0.37918100000001687
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4763.223709208768,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2099418505300715,
              "min": 0.14062300000023242,
              "max": 2.790280000000166,
              "p75": 0.22497199999997974,
              "p99": 0.27401400000007925,
              "p995": 0.29997199999979784,
              "p999": 0.6733819999999469
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 7992.246868680304,
            "unit": "ops/s",
            "extra": {
              "mean": 0.12512126019514735,
              "min": 0.07814700000017183,
              "max": 0.8163500000000568,
              "p75": 0.1297629999999117,
              "p99": 0.3208519999998316,
              "p995": 0.3516989999998259,
              "p999": 0.5008490000000165
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6643.099209033436,
            "unit": "ops/s",
            "extra": {
              "mean": 0.15053214900662293,
              "min": 0.14135499999997592,
              "max": 0.4489409999999907,
              "p75": 0.1518349999998918,
              "p99": 0.2546679999999242,
              "p995": 0.3179360000000315,
              "p999": 0.41294499999997925
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.160833375693107,
            "unit": "ops/s",
            "extra": {
              "mean": 70.6173128,
              "min": 68.77094799999998,
              "max": 78.043407,
              "p75": 70.35654699999998,
              "p99": 78.043407,
              "p995": 78.043407,
              "p999": 78.043407
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1548.469891864102,
            "unit": "ops/s",
            "extra": {
              "mean": 0.6457988012903274,
              "min": 0.34720100000004095,
              "max": 4.91823899999963,
              "p75": 0.6474140000000261,
              "p99": 1.8741770000001452,
              "p995": 3.208274000000074,
              "p999": 4.91823899999963
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 726.9666750287824,
            "unit": "ops/s",
            "extra": {
              "mean": 1.37557887362637,
              "min": 0.9459329999999682,
              "max": 7.325032000000192,
              "p75": 1.605098999999882,
              "p99": 2.3997779999999693,
              "p995": 5.192072999999937,
              "p999": 7.325032000000192
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 858160.9633416351,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001165282555041948,
              "min": 0.0010320000001229346,
              "max": 0.39760499999988497,
              "p75": 0.001142000000072585,
              "p99": 0.0019739999997909763,
              "p995": 0.0020839999999680003,
              "p999": 0.009907999999995809
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 488123.8223228925,
            "unit": "ops/s",
            "extra": {
              "mean": 0.002048660512492879,
              "min": 0.0017329999999446954,
              "max": 0.34882399999997915,
              "p75": 0.0018939999999929569,
              "p99": 0.004068000000017946,
              "p995": 0.005290000000059081,
              "p999": 0.015659999999968477
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1908922.2704929202,
            "unit": "ops/s",
            "extra": {
              "mean": 0.000523855798351486,
              "min": 0.0004999999946448952,
              "max": 0.5201640000013867,
              "p75": 0.0005110000056447461,
              "p99": 0.0006409999914467335,
              "p995": 0.0008509999897796661,
              "p999": 0.0010420000035082921
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1412292.61027524,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007080685636421416,
              "min": 0.0006619999912800267,
              "max": 0.2545269999973243,
              "p75": 0.0006819999980507419,
              "p99": 0.0008119999984046444,
              "p995": 0.0008919999963836744,
              "p999": 0.0014519999967887998
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 292314.43904150283,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034209736723201,
              "min": 0.0032359999968321063,
              "max": 0.35779099999490427,
              "p75": 0.003405999996175524,
              "p99": 0.003736999999091495,
              "p995": 0.006130999994638842,
              "p999": 0.012352999998256564
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 302177.9728046548,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033093080568333067,
              "min": 0.003126000003248919,
              "max": 0.16409800000110408,
              "p75": 0.0032659999997122213,
              "p99": 0.004798999994818587,
              "p995": 0.006492000000434928,
              "p999": 0.013314999996509869
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42940.40373344673,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023288090307848914,
              "min": 0.022291000001132488,
              "max": 2.4082429999980377,
              "p75": 0.022842999998829328,
              "p99": 0.033573000007891096,
              "p995": 0.04026599999633618,
              "p999": 0.045494999998481944
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 11623.890026382363,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0860297196317526,
              "min": 0.08365600000252016,
              "max": 0.4576579999993555,
              "p75": 0.084818000002997,
              "p99": 0.1005379999987781,
              "p995": 0.12263899999379646,
              "p999": 0.26322300000174437
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986103650724697,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3915686999999,
              "min": 999.7951909999992,
              "max": 1002.0522430000001,
              "p75": 1001.7885650000007,
              "p99": 1002.0522430000001,
              "p995": 1002.0522430000001,
              "p999": 1002.0522430000001
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33288464093314674,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.0436746999994,
              "min": 3003.4745910000056,
              "max": 3004.5648760000004,
              "p75": 3004.539733999998,
              "p99": 3004.5648760000004,
              "p995": 3004.5648760000004,
              "p999": 3004.5648760000004
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.177491048173268,
            "unit": "ops/s",
            "extra": {
              "mean": 98.25604319047645,
              "min": 96.12649699999747,
              "max": 99.7850150000013,
              "p75": 98.99740799999563,
              "p99": 99.7850150000013,
              "p995": 99.7850150000013,
              "p999": 99.7850150000013
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2563123.313082928,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00039014900098473953,
              "min": 0.00032999999996263796,
              "max": 4.130082000000016,
              "p75": 0.0003609999999980573,
              "p99": 0.0006809999999859428,
              "p995": 0.001033000000006723,
              "p999": 0.0020140000000310465
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
        "date": 1752695502281,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4281.125066470161,
            "unit": "ops/s",
            "extra": {
              "mean": 0.23358345866417585,
              "min": 0.1660909999999376,
              "max": 1.257047,
              "p75": 0.2561789999999746,
              "p99": 0.3227229999999963,
              "p995": 0.4972490000000107,
              "p999": 1.0170590000000175
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 8930.79939691381,
            "unit": "ops/s",
            "extra": {
              "mean": 0.11197205933721532,
              "min": 0.07908799999995608,
              "max": 0.4183909999999287,
              "p75": 0.1281690000000708,
              "p99": 0.1528049999999439,
              "p995": 0.1626139999998486,
              "p999": 0.36557299999981296
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4687.725575857071,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2133230676194536,
              "min": 0.14373900000009598,
              "max": 3.3981039999998757,
              "p75": 0.2339560000000347,
              "p99": 0.26933299999973315,
              "p995": 0.2893810000000485,
              "p999": 0.7404620000002069
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9210.821291199278,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10856795158489031,
              "min": 0.07435899999973117,
              "max": 0.5219349999997576,
              "p75": 0.12094600000000355,
              "p99": 0.14964000000009037,
              "p995": 0.15788500000007843,
              "p999": 0.4026219999996101
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6684.161508008959,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14960739635058198,
              "min": 0.13912999999990916,
              "max": 0.5880680000000211,
              "p75": 0.15310599999997976,
              "p99": 0.2623989999999594,
              "p995": 0.2825669999999718,
              "p999": 0.4056979999999726
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 13.163323845841342,
            "unit": "ops/s",
            "extra": {
              "mean": 75.96865440000002,
              "min": 72.93550699999992,
              "max": 89.60825599999998,
              "p75": 75.48060400000008,
              "p99": 89.60825599999998,
              "p995": 89.60825599999998,
              "p999": 89.60825599999998
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1733.1860715561438,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5769720957324267,
              "min": 0.4141639999998006,
              "max": 3.127349000000322,
              "p75": 0.662166999999954,
              "p99": 1.459084999999959,
              "p995": 1.663375999999971,
              "p999": 3.127349000000322
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 716.3419077417735,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3959814289693622,
              "min": 1.0858769999999822,
              "max": 6.682317000000239,
              "p75": 1.57138400000008,
              "p99": 3.2108470000002853,
              "p995": 6.370046999999886,
              "p999": 6.682317000000239
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 813635.0854740794,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0012290522100793279,
              "min": 0.0010919999999714491,
              "max": 0.04249000000004344,
              "p75": 0.0012320000000727305,
              "p99": 0.0018340000001444423,
              "p995": 0.002203999999892403,
              "p999": 0.009577999999919484
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 520276.2133714905,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019220559662334101,
              "min": 0.001722999999969943,
              "max": 0.3407560000000558,
              "p75": 0.0018540000000939472,
              "p99": 0.0036169999999629,
              "p995": 0.0039480000000367,
              "p999": 0.013714999999933752
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1883873.917174052,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005308210867424041,
              "min": 0.0004999999946448952,
              "max": 3.1085109999985434,
              "p75": 0.0005119999987073243,
              "p99": 0.0006310000026132911,
              "p995": 0.0008510000043315813,
              "p999": 0.0010310000070603564
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1393601.3477977149,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007175653220917758,
              "min": 0.0006709999870508909,
              "max": 0.29615299998840783,
              "p75": 0.0006920000014360994,
              "p99": 0.0008219999872380868,
              "p995": 0.0008820000075502321,
              "p999": 0.0013420000032056123
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 291079.5237938183,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034354872749769046,
              "min": 0.0032260000007227063,
              "max": 0.02482600000075763,
              "p75": 0.003426999996008817,
              "p99": 0.0035970000026281923,
              "p995": 0.004017999999632593,
              "p999": 0.012132999996538274
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 291353.9959218779,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034322508494722503,
              "min": 0.0032159999973373488,
              "max": 0.15090200000122422,
              "p75": 0.0033970000004046597,
              "p99": 0.00413700000353856,
              "p995": 0.006180999997013714,
              "p999": 0.012985000001208391
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41677.57813942399,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023993716637149602,
              "min": 0.02269199999864213,
              "max": 2.503972000005888,
              "p75": 0.023574000006192364,
              "p99": 0.034524999995483086,
              "p995": 0.04127699999662582,
              "p999": 0.050463999999919906
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 11991.455385796728,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08339271321348111,
              "min": 0.07831599999917671,
              "max": 0.4103460000042105,
              "p75": 0.08238400000846013,
              "p99": 0.1042650000017602,
              "p995": 0.13786800000525545,
              "p999": 0.21781699999701232
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9984537525836913,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.548642,
              "min": 1000.0850179999998,
              "max": 1002.3387729999995,
              "p75": 1001.9947970000012,
              "p99": 1002.3387729999995,
              "p995": 1002.3387729999995,
              "p999": 1002.3387729999995
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.3328337215819946,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.5032554,
              "min": 3002.797694000001,
              "max": 3005.288941999999,
              "p75": 3004.756889000004,
              "p99": 3005.288941999999,
              "p995": 3005.288941999999,
              "p999": 3005.288941999999
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.190262794542358,
            "unit": "ops/s",
            "extra": {
              "mean": 98.13289609523851,
              "min": 95.41932799999631,
              "max": 99.5267029999959,
              "p75": 99.04141600000003,
              "p99": 99.5267029999959,
              "p995": 99.5267029999959,
              "p999": 99.5267029999959
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2489306.9694264443,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00040171823414386203,
              "min": 0.00032000000004472895,
              "max": 0.48513600000001134,
              "p75": 0.0003710000000864966,
              "p99": 0.0007219999999961146,
              "p995": 0.0011319999999841457,
              "p999": 0.0021440000000438886
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
          "id": "1b0dd02287558c674eeccb9f88052eabe20ea24b",
          "message": "Update Claude hook configuration syntax\n\n- Update hook matcher syntax to use new format\n- Improve file path matching for TypeScript/JavaScript files\n- Add proper hook structure for Stop events\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-16T23:57:33+03:00",
          "tree_id": "ac0d97d981e687447ef490834ab23c837e097ee6",
          "url": "https://github.com/carlrannaberg/autoagent/commit/1b0dd02287558c674eeccb9f88052eabe20ea24b"
        },
        "date": 1752699583049,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4475.429499100027,
            "unit": "ops/s",
            "extra": {
              "mean": 0.22344224173369104,
              "min": 0.15284600000006776,
              "max": 0.7587980000000698,
              "p75": 0.24254300000001194,
              "p99": 0.29973999999992884,
              "p995": 0.382665999999972,
              "p999": 0.6646030000000565
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10290.910151451435,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09717313486202768,
              "min": 0.07689299999992727,
              "max": 0.38829899999996087,
              "p75": 0.10655900000006113,
              "p99": 0.147946999999931,
              "p995": 0.15158400000018446,
              "p999": 0.272570000000087
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4654.568982257751,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2148426640171823,
              "min": 0.14388899999994464,
              "max": 3.0636289999997643,
              "p75": 0.23030999999991764,
              "p99": 0.26427399999988666,
              "p995": 0.27874100000008184,
              "p999": 0.6221630000000005
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9643.1481242944,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10370057445043873,
              "min": 0.07415899999978137,
              "max": 0.4553809999997611,
              "p75": 0.11203899999964051,
              "p99": 0.14669400000002497,
              "p995": 0.15221400000018548,
              "p999": 0.28961200000003373
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6780.01730597922,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14749224889413062,
              "min": 0.13912100000004557,
              "max": 0.40949000000000524,
              "p75": 0.14999199999999746,
              "p99": 0.242966000000024,
              "p995": 0.2715299999999843,
              "p999": 0.35085000000003674
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.247492638979503,
            "unit": "ops/s",
            "extra": {
              "mean": 70.18778849999998,
              "min": 68.36195999999995,
              "max": 75.17341899999997,
              "p75": 71.01632500000005,
              "p99": 75.17341899999997,
              "p995": 75.17341899999997,
              "p999": 75.17341899999997
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1940.9104155927396,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5152221307929905,
              "min": 0.3469230000000607,
              "max": 4.171513000000232,
              "p75": 0.6202760000001035,
              "p99": 1.0870129999998426,
              "p995": 1.2523449999998775,
              "p999": 4.171513000000232
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 699.5217306514755,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4295481558073748,
              "min": 0.9882179999999607,
              "max": 4.900102999999945,
              "p75": 1.599868000000015,
              "p99": 2.6417069999999967,
              "p995": 4.725969999999961,
              "p999": 4.900102999999945
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 885524.4025139215,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001129274356710095,
              "min": 0.001040999999986525,
              "max": 0.1971600000001672,
              "p75": 0.0011219999998957064,
              "p99": 0.001993999999967855,
              "p995": 0.002184000000170272,
              "p999": 0.009536999999909312
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 533295.3728446605,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001875133464342437,
              "min": 0.0017029999999067513,
              "max": 1.2391789999999219,
              "p75": 0.0018230000000016844,
              "p99": 0.0034660000000030777,
              "p995": 0.0037169999999946413,
              "p999": 0.011903000000017983
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1915453.069096601,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005220696952244501,
              "min": 0.0004999999946448952,
              "max": 0.37605099999927916,
              "p75": 0.0005110000056447461,
              "p99": 0.0005819999933009967,
              "p995": 0.0008410000009462237,
              "p999": 0.0009810000046854839
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1414919.9511747097,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007067537631155526,
              "min": 0.0006609999982174486,
              "max": 0.2996549999952549,
              "p75": 0.0006819999980507419,
              "p99": 0.000822000001790002,
              "p995": 0.0009120000031543896,
              "p999": 0.0013219999964348972
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 290644.1916107074,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034406330106173705,
              "min": 0.0032359999968321063,
              "max": 0.12955399999918882,
              "p75": 0.003396000000066124,
              "p99": 0.005270000001473818,
              "p995": 0.006623000001127366,
              "p999": 0.012914999999338761
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 296062.69495653437,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003377662964754179,
              "min": 0.0031860000017331913,
              "max": 0.12995499999669846,
              "p75": 0.003337000001920387,
              "p99": 0.004357999998319428,
              "p995": 0.00603199999750359,
              "p999": 0.013074000002234243
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42256.84334565886,
            "unit": "ops/s",
            "extra": {
              "mean": 0.02366480600124458,
              "min": 0.022742999994079582,
              "max": 0.236613999994006,
              "p75": 0.02339300001040101,
              "p99": 0.03272099999594502,
              "p995": 0.0405659999960335,
              "p999": 0.04490400000941008
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12370.122556630255,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08083994280751977,
              "min": 0.07910800000536256,
              "max": 0.31771600000502076,
              "p75": 0.0798990000039339,
              "p99": 0.09186299999419134,
              "p995": 0.1011209999996936,
              "p999": 0.2120510000095237
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9986549142924421,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.3468974000001,
              "min": 999.7588440000018,
              "max": 1002.0088919999998,
              "p75": 1001.7561979999991,
              "p99": 1002.0088919999998,
              "p995": 1002.0088919999998,
              "p999": 1002.0088919999998
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.332855738760463,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.3045185999995,
              "min": 3003.348254999997,
              "max": 3004.609056000001,
              "p75": 3004.434592999998,
              "p99": 3004.609056000001,
              "p995": 3004.609056000001,
              "p999": 3004.609056000001
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.165966726302957,
            "unit": "ops/s",
            "extra": {
              "mean": 98.36742799999982,
              "min": 95.00226800000382,
              "max": 99.95243499999924,
              "p75": 99.15317900000082,
              "p99": 99.95243499999924,
              "p995": 99.95243499999924,
              "p999": 99.95243499999924
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2576742.9796094648,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003880868243023453,
              "min": 0.00031999999998788553,
              "max": 0.23534000000000788,
              "p75": 0.00037099999997280975,
              "p99": 0.000661000000036438,
              "p995": 0.0007209999999986394,
              "p999": 0.0010819999999966967
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
          "id": "17cce4a3ca2c0ca50847282ecea9f82602108790",
          "message": "chore: Prepare release v0.7.1\n\n- Bump version to 0.7.1\n- Update CHANGELOG.md with recent fixes and improvements\n- Add task completion validation and tool failure detection features\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-17T00:14:46+03:00",
          "tree_id": "c6d97cdc98ff887207456504a296fe9000e03b56",
          "url": "https://github.com/carlrannaberg/autoagent/commit/17cce4a3ca2c0ca50847282ecea9f82602108790"
        },
        "date": 1752729852040,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4854.820055404846,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20598085790774165,
              "min": 0.1609109999999987,
              "max": 0.7765920000000506,
              "p75": 0.21442100000001574,
              "p99": 0.2878579999999147,
              "p995": 0.34121699999991506,
              "p999": 0.6356680000000097
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10307.010526989408,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09702134264648817,
              "min": 0.07702399999993759,
              "max": 0.3496939999999995,
              "p75": 0.10661899999990965,
              "p99": 0.143167999999946,
              "p995": 0.14989999999988868,
              "p999": 0.28882900000007794
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4879.365902826565,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20494466287529506,
              "min": 0.13841899999988527,
              "max": 3.117575999999872,
              "p75": 0.22224499999992986,
              "p99": 0.2576819999999316,
              "p995": 0.2699750000001586,
              "p999": 0.6071750000000975
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9723.253895835387,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10284622932949583,
              "min": 0.07347699999991164,
              "max": 0.37986999999975524,
              "p75": 0.10991500000000087,
              "p99": 0.14092299999992974,
              "p995": 0.14792700000043624,
              "p999": 0.31005999999979394
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6789.370285905991,
            "unit": "ops/s",
            "extra": {
              "mean": 0.147289064801178,
              "min": 0.1388409999999567,
              "max": 0.4045820000000049,
              "p75": 0.14903099999992264,
              "p99": 0.25172299999996994,
              "p995": 0.27953600000000733,
              "p999": 0.3731320000000551
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.319988010962355,
            "unit": "ops/s",
            "extra": {
              "mean": 69.83246070000001,
              "min": 69.35615900000016,
              "max": 70.77633300000002,
              "p75": 70.25656299999991,
              "p99": 70.77633300000002,
              "p995": 70.77633300000002,
              "p999": 70.77633300000002
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1975.0113448709587,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5063262054655878,
              "min": 0.3469919999997728,
              "max": 1.7815129999999044,
              "p75": 0.606148999999732,
              "p99": 1.0881669999998849,
              "p995": 1.2132900000001428,
              "p999": 1.7815129999999044
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 722.0188841526033,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3850053259668533,
              "min": 1.0273130000000492,
              "max": 6.989683000000014,
              "p75": 1.5773979999999028,
              "p99": 3.83146899999997,
              "p995": 4.630885999999919,
              "p999": 6.989683000000014
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 899719.7840672839,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001111457164451123,
              "min": 0.0010209999998096464,
              "max": 0.21974999999997635,
              "p75": 0.0011030000000573636,
              "p99": 0.0015120000000479195,
              "p995": 0.0021350000001802982,
              "p999": 0.009517999999843596
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 520185.69413081516,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0019223904295771006,
              "min": 0.0017329999999446954,
              "max": 0.2545310000000427,
              "p75": 0.0018239999999991596,
              "p99": 0.003896999999938089,
              "p995": 0.004148000000100183,
              "p999": 0.013535000000047148
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1903066.4052251321,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005254677384112092,
              "min": 0.0004999999946448952,
              "max": 2.906992000003811,
              "p75": 0.0005110000056447461,
              "p99": 0.0006609999982174486,
              "p995": 0.0008420000085607171,
              "p999": 0.0010719999991124496
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1415868.5642859405,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007062802474919882,
              "min": 0.0006609999982174486,
              "max": 0.3566370000044117,
              "p75": 0.0006819999980507419,
              "p99": 0.0008110000053420663,
              "p995": 0.0009219999919878319,
              "p999": 0.001352999999653548
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 294789.5236195868,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00339225080905676,
              "min": 0.003214999996998813,
              "max": 0.03091800000402145,
              "p75": 0.0033660000044619665,
              "p99": 0.004088000001502223,
              "p995": 0.006843000002845656,
              "p999": 0.012271999999938998
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 298536.5676217891,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033496734017083056,
              "min": 0.0031549999985145405,
              "max": 0.15078099999664119,
              "p75": 0.0033159999948111363,
              "p99": 0.004067999994731508,
              "p995": 0.0054799999998067506,
              "p999": 0.013154000000213273
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42646.41423579198,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023448630275713242,
              "min": 0.022371999992174096,
              "max": 2.33709600000293,
              "p75": 0.023002999994787388,
              "p99": 0.03555600000254344,
              "p995": 0.04042499999923166,
              "p999": 0.045765999995637685
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12031.053972742377,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0831182373768421,
              "min": 0.08057099999859929,
              "max": 0.3563959999883082,
              "p75": 0.08197300000756513,
              "p99": 0.09923500000149943,
              "p995": 0.10915299999760464,
              "p999": 0.24555800000962336
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9987396576673285,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.2619328000003,
              "min": 999.8109129999993,
              "max": 1002.117988,
              "p75": 1001.8258190000006,
              "p99": 1002.117988,
              "p995": 1002.117988,
              "p999": 1002.117988
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33285787173770803,
            "unit": "ops/s",
            "extra": {
              "mean": 3004.285266799999,
              "min": 3003.5621329999994,
              "max": 3004.6158300000025,
              "p75": 3004.480598000002,
              "p99": 3004.6158300000025,
              "p995": 3004.6158300000025,
              "p999": 3004.6158300000025
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.143920480149562,
            "unit": "ops/s",
            "extra": {
              "mean": 98.5812144285713,
              "min": 97.10658300000068,
              "max": 100.13785500000085,
              "p75": 98.99303900000086,
              "p99": 100.13785500000085,
              "p995": 100.13785500000085,
              "p999": 100.13785500000085
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2612378.1974590085,
            "unit": "ops/s",
            "extra": {
              "mean": 0.00038279296656689056,
              "min": 0.00030999999989944627,
              "max": 4.299404999999979,
              "p75": 0.0003510000000233049,
              "p99": 0.0007319999999708671,
              "p995": 0.0011120000000346408,
              "p999": 0.002043999999955304
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
          "id": "fd898d92370ef2e18e45e950bcc973edccbd33fe",
          "message": "fix: use simple model ID for Claude Sonnet 4\n\n- Change from claude-sonnet-4-20250514 to claude-sonnet-4\n- Use the alias without date suffix for better maintainability",
          "timestamp": "2025-07-19T11:54:15+03:00",
          "tree_id": "7af7dc4a7f278f5a2a630700b104cc9975f783a4",
          "url": "https://github.com/carlrannaberg/autoagent/commit/fd898d92370ef2e18e45e950bcc973edccbd33fe"
        },
        "date": 1752946081915,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4601.630682324696,
            "unit": "ops/s",
            "extra": {
              "mean": 0.21731426727509787,
              "min": 0.1515550000000303,
              "max": 0.7155820000000404,
              "p75": 0.23485999999991236,
              "p99": 0.2977390000000355,
              "p995": 0.33432700000003024,
              "p999": 0.6715189999999893
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 9977.951766581233,
            "unit": "ops/s",
            "extra": {
              "mean": 0.10022096953297181,
              "min": 0.0757419999999911,
              "max": 0.4963289999998324,
              "p75": 0.1092750000000251,
              "p99": 0.15064299999994546,
              "p995": 0.16292599999997037,
              "p999": 0.33758400000010624
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4605.746992500495,
            "unit": "ops/s",
            "extra": {
              "mean": 0.2171200462440279,
              "min": 0.14121400000021822,
              "max": 3.8532800000000407,
              "p75": 0.23441000000002532,
              "p99": 0.26899500000013177,
              "p995": 0.2906749999999647,
              "p999": 0.8166719999999259
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 9239.99796720034,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1082251320346333,
              "min": 0.07325700000001234,
              "max": 0.6667360000001281,
              "p75": 0.1258159999997588,
              "p99": 0.150101000000177,
              "p995": 0.15799500000002809,
              "p999": 0.3263300000003255
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6814.668100378418,
            "unit": "ops/s",
            "extra": {
              "mean": 0.14674228961267682,
              "min": 0.138608999999974,
              "max": 0.4012000000000171,
              "p75": 0.14967000000001462,
              "p99": 0.2145909999999276,
              "p995": 0.2787819999999783,
              "p999": 0.3741090000000895
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 14.071424858381592,
            "unit": "ops/s",
            "extra": {
              "mean": 71.0660086,
              "min": 68.93563800000004,
              "max": 76.999503,
              "p75": 70.78270999999995,
              "p99": 76.999503,
              "p995": 76.999503,
              "p999": 76.999503
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1809.552027300145,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5526229613259597,
              "min": 0.3506760000000213,
              "max": 1.3463269999997465,
              "p75": 0.6425910000002659,
              "p99": 1.150376999999935,
              "p995": 1.2489849999997205,
              "p999": 1.3463269999997465
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 700.3166788251835,
            "unit": "ops/s",
            "extra": {
              "mean": 1.4279254375000041,
              "min": 1.0194460000000163,
              "max": 4.218444999999974,
              "p75": 1.5986079999997855,
              "p99": 3.2109709999999723,
              "p995": 3.3884140000000116,
              "p999": 4.218444999999974
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 847331.2492645195,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0011801759947694557,
              "min": 0.0011019999999462016,
              "max": 0.2181479999999283,
              "p75": 0.0011819999999715947,
              "p99": 0.0012530000001333974,
              "p995": 0.0013020000001233711,
              "p999": 0.009697999999843887
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 505703.943361187,
            "unit": "ops/s",
            "extra": {
              "mean": 0.001977441570562905,
              "min": 0.001722999999969943,
              "max": 0.6188060000000064,
              "p75": 0.001844000000005508,
              "p99": 0.0040669999999636275,
              "p995": 0.0042680000000245855,
              "p999": 0.013755000000060136
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1903717.6802064592,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005252879722646424,
              "min": 0.0004999999946448952,
              "max": 2.6650809999991907,
              "p75": 0.0005110000056447461,
              "p99": 0.0007120000082068145,
              "p995": 0.0008419999940088019,
              "p999": 0.001021999996737577
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1415035.8981151981,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007066958522621099,
              "min": 0.0006609999982174486,
              "max": 0.1437889999942854,
              "p75": 0.0006820000126026571,
              "p99": 0.0008309999975608662,
              "p995": 0.0009420000133104622,
              "p999": 0.0014119999977992848
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 289941.29544316453,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034489740361804515,
              "min": 0.003246000000217464,
              "max": 0.028042000005370937,
              "p75": 0.003445999995165039,
              "p99": 0.0036370000016177073,
              "p995": 0.004207999998470768,
              "p999": 0.01245300000300631
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 294823.8366683286,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0033918560022166105,
              "min": 0.0031859999944572337,
              "max": 0.12667599999986123,
              "p75": 0.003356000001076609,
              "p99": 0.004808999998203944,
              "p995": 0.0059009999968111515,
              "p999": 0.012754000003042165
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 42274.698362180585,
            "unit": "ops/s",
            "extra": {
              "mean": 0.02365481100379917,
              "min": 0.02251100000285078,
              "max": 2.276874000002863,
              "p75": 0.02324399999633897,
              "p99": 0.03523599999607541,
              "p995": 0.04053600000042934,
              "p999": 0.04718799999682233
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 11934.777523810673,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08378874243821752,
              "min": 0.08164299999771174,
              "max": 0.3561550000013085,
              "p75": 0.08239399999729358,
              "p99": 0.10429499999736436,
              "p995": 0.16586000000825152,
              "p999": 0.21366000000853091
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9985536289194782,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.4484661,
              "min": 1000.6618669999989,
              "max": 1001.9697380000016,
              "p75": 1001.8037289999993,
              "p99": 1001.9697380000016,
              "p995": 1001.9697380000016,
              "p999": 1001.9697380000016
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33289625739192835,
            "unit": "ops/s",
            "extra": {
              "mean": 3003.9388482,
              "min": 3002.8039380000046,
              "max": 3004.745514999995,
              "p75": 3004.460689000007,
              "p99": 3004.745514999995,
              "p995": 3004.745514999995,
              "p999": 3004.745514999995
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.153854446978947,
            "unit": "ops/s",
            "extra": {
              "mean": 98.48476804761837,
              "min": 95.50346100000024,
              "max": 99.70287700000335,
              "p75": 99.0847020000001,
              "p99": 99.70287700000335,
              "p995": 99.70287700000335,
              "p999": 99.70287700000335
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2465639.4624907286,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0004055743003844627,
              "min": 0.00032999999996263796,
              "max": 5.033795999999938,
              "p75": 0.0003699999999753345,
              "p99": 0.0007320000000277105,
              "p995": 0.0012520000000222353,
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
          "id": "69bbc1efde3a8139622f950a4bcc52b70e1f5b50",
          "message": "feat: add comprehensive STM migration specification\n\nCreate detailed specification for migrating from homegrown issues/plans\nsystem to STM (Simple Task Master) integration. Key improvements:\n\n- Direct STM API usage via npm dependency (not CLI calls)\n- Clean-cut migration approach (manual deletion vs complex scripts)\n- Unified issue+plan content into STM's description/details/validation sections\n- Complete FileManager replacement (~80% code reduction)\n- Comprehensive error handling and testing strategies\n- 5-day implementation timeline with clear phases\n\nSpecification includes complete TypeScript interfaces, migration approach,\ntesting strategies, and addresses all critical implementation details\nfor a production-ready migration.\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
          "timestamp": "2025-07-19T23:12:19+03:00",
          "tree_id": "c4e29d07085ac3e31e5ca8a3a00404337a2333a6",
          "url": "https://github.com/carlrannaberg/autoagent/commit/69bbc1efde3a8139622f950a4bcc52b70e1f5b50"
        },
        "date": 1752958243549,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config from file",
            "value": 4772.501358213474,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20953372769166426,
              "min": 0.1572840000000042,
              "max": 0.7472870000000285,
              "p75": 0.21582300000000032,
              "p99": 0.30317700000000514,
              "p995": 0.3706530000000612,
              "p999": 0.7052290000000312
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load config with defaults",
            "value": 10959.154610813308,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09124791423357675,
              "min": 0.07766599999990831,
              "max": 0.3170310000000427,
              "p75": 0.09517800000003263,
              "p99": 0.13439100000005055,
              "p995": 0.14523099999996703,
              "p999": 0.2754050000000916
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load large config",
            "value": 4859.060245329663,
            "unit": "ops/s",
            "extra": {
              "mean": 0.20580111163700027,
              "min": 0.14293700000007448,
              "max": 2.4758489999999256,
              "p75": 0.22009200000002238,
              "p99": 0.26293100000020786,
              "p995": 0.27136700000028213,
              "p999": 0.5604510000000573
            }
          },
          {
            "name": "test/performance/benchmarks/core/config.bench.ts > load rate limits",
            "value": 10226.652270403996,
            "unit": "ops/s",
            "extra": {
              "mean": 0.09778371001173151,
              "min": 0.07385800000020026,
              "max": 0.31431800000018484,
              "p75": 0.1050359999999273,
              "p99": 0.13524199999983466,
              "p995": 0.1474159999997937,
              "p999": 0.26353300000027957
            }
          },
          {
            "name": "test/performance/benchmarks/core/file-manager.bench.ts > check file existence",
            "value": 6621.2768373864055,
            "unit": "ops/s",
            "extra": {
              "mean": 0.1510282721232249,
              "min": 0.140041999999994,
              "max": 0.40622999999999365,
              "p75": 0.15080300000010993,
              "p99": 0.25340399999993224,
              "p995": 0.28306799999995746,
              "p999": 0.3347760000000335
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Array operations comparison",
            "value": 13.480603098564613,
            "unit": "ops/s",
            "extra": {
              "mean": 74.1806574,
              "min": 69.0059960000001,
              "max": 89.23064,
              "p75": 74.11537399999997,
              "p99": 89.23064,
              "p995": 89.23064,
              "p999": 89.23064
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Performance trend analysis",
            "value": 1779.5956616289059,
            "unit": "ops/s",
            "extra": {
              "mean": 0.5619253977528111,
              "min": 0.35427300000037576,
              "max": 3.7703230000001895,
              "p75": 0.640027999999802,
              "p99": 1.2694339999998192,
              "p995": 1.3447759999999107,
              "p999": 3.7703230000001895
            }
          },
          {
            "name": "test/performance/benchmarks/example-enhanced.bench.ts > Statistical analysis demonstration",
            "value": 714.997753329267,
            "unit": "ops/s",
            "extra": {
              "mean": 1.3986057932960878,
              "min": 0.9926269999998567,
              "max": 4.573474000000033,
              "p75": 1.597389000000021,
              "p99": 3.081805000000031,
              "p995": 4.4172960000000785,
              "p999": 4.573474000000033
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > extract file names",
            "value": 829622.2760450689,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0012053678268707378,
              "min": 0.001111999999920954,
              "max": 2.3596039999999903,
              "p75": 0.0012019999999210995,
              "p99": 0.0013229999999566644,
              "p995": 0.002274999999826832,
              "p999": 0.010039000000006126
            }
          },
          {
            "name": "test/performance/benchmarks/utils/git.bench.ts > normalize file paths",
            "value": 527228.4330770877,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0018967110596893528,
              "min": 0.0017129999999951906,
              "max": 0.22073299999999563,
              "p75": 0.0018139999999675638,
              "p99": 0.003777000000013686,
              "p995": 0.004007000000001426,
              "p999": 0.01205299999998033
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate backoff delays",
            "value": 1906031.5616019696,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0005246502839436332,
              "min": 0.0004999999946448952,
              "max": 2.5643140000029234,
              "p75": 0.0005110000056447461,
              "p99": 0.000610999995842576,
              "p995": 0.0008420000085607171,
              "p999": 0.0010130000009667128
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > calculate jittered delays",
            "value": 1412579.3050151046,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0007079248552273723,
              "min": 0.0006709999870508909,
              "max": 0.3038280000037048,
              "p75": 0.0006819999980507419,
              "p99": 0.0008319999906234443,
              "p995": 0.0009520000021439046,
              "p999": 0.0014230000087991357
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (negative)",
            "value": 287203.09990635037,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0034818565688395234,
              "min": 0.0032659999997122213,
              "max": 0.027200999997148756,
              "p75": 0.003475999998045154,
              "p99": 0.00361700000212295,
              "p995": 0.00632200000109151,
              "p999": 0.012582999996084254
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check rate limit error (positive)",
            "value": 292269.38974135014,
            "unit": "ops/s",
            "extra": {
              "mean": 0.003421500968284673,
              "min": 0.0031759999983478338,
              "max": 0.18534599999838974,
              "p75": 0.0033669999975245446,
              "p99": 0.00525999999808846,
              "p995": 0.007243000000016764,
              "p999": 0.01430600000458071
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > check various error types",
            "value": 41926.79821017383,
            "unit": "ops/s",
            "extra": {
              "mean": 0.023851093875261454,
              "min": 0.02281300000322517,
              "max": 0.277168000000529,
              "p75": 0.023532999999588355,
              "p99": 0.035826000006636605,
              "p995": 0.040556000007200055,
              "p999": 0.0466080000041984
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > error checking 1000 times",
            "value": 12213.229629628497,
            "unit": "ops/s",
            "extra": {
              "mean": 0.08187842448929851,
              "min": 0.08002999999735039,
              "max": 0.32131099999241997,
              "p75": 0.08078099999693222,
              "p99": 0.09747199999401346,
              "p995": 0.10472600000503007,
              "p999": 0.1975899999961257
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 1 retry",
            "value": 0.9987441589199418,
            "unit": "ops/s",
            "extra": {
              "mean": 1001.2574202000002,
              "min": 1000.0290069999992,
              "max": 1001.9705470000008,
              "p75": 1001.5963620000002,
              "p99": 1001.9705470000008,
              "p995": 1001.9705470000008,
              "p999": 1001.9705470000008
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > operation with 2 retries",
            "value": 0.33289363873786093,
            "unit": "ops/s",
            "extra": {
              "mean": 3003.962478199999,
              "min": 3003.2121110000007,
              "max": 3004.2917580000067,
              "p75": 3004.1818769999954,
              "p99": 3004.2917580000067,
              "p995": 3004.2917580000067,
              "p999": 3004.2917580000067
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > retry with jitter (100 operations)",
            "value": 10.111810774637897,
            "unit": "ops/s",
            "extra": {
              "mean": 98.89425566666718,
              "min": 97.33108499999798,
              "max": 99.71391399999993,
              "p75": 99.54870400000073,
              "p99": 99.71391399999993,
              "p995": 99.71391399999993,
              "p999": 99.71391399999993
            }
          },
          {
            "name": "test/performance/benchmarks/utils/retry.bench.ts > successful operation (no retry)",
            "value": 2637424.9292058726,
            "unit": "ops/s",
            "extra": {
              "mean": 0.0003791577113442617,
              "min": 0.00031999999998788553,
              "max": 3.952827999999954,
              "p75": 0.00035100000013699173,
              "p99": 0.0006809999999859428,
              "p995": 0.0008520000000089567,
              "p999": 0.0020039999999426072
            }
          }
        ]
      }
    ]
  }
}