window.BENCHMARK_DATA = {
  "lastUpdate": 1751710233363,
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
      }
    ]
  }
}