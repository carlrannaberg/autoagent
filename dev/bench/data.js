window.BENCHMARK_DATA = {
  "lastUpdate": 1751646656681,
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
      }
    ]
  }
}