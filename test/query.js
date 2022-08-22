// raw query vs orm

// 1.
let array = {};
const Op = Sequelize.Op;

for (var data in reportQuery) {
  console.log(data);

  switch (data.query) {
    case "detectionDate":
      array.reportQuery[data.query] = {
        [Op.between]: [
          new Date(reportQuery.data.startDate),
          new Date(reportQuery.data.endDate),
        ],
      };
      break;

    default:
      array.reportQuery[data.query] = reportQuery[data.data];
  }
}

// 2.
reportQuery.forEach(() => {
  switch (reportQuery.query) {
    case "detectionDate":
      a.reportQuery.query = {
        [Op.between]: [
          new Date(reportQuery.data.startDate),
          new Date(reportQuery.data.endDate),
        ],
      };
      break;

    default:
      a.reportQuery.query = reportQuery.data;
  }
});

const findReportQueryResponse2 = await fetchQueryReportRecord(a);
console.log(findReportQueryResponse2);

// 3. 각 key를 명시해주고 싶었음
for (let i = 0; i < a.length; i++) {
  if (i == a.length - 1) {
    b.concat(Object.keys(a[i]));
    b.concat(" ");
    b.concat(Object.values(a[i]));
    b.concat("and");
  } else {
    b.concat(Object.keys(a[i]));
    b.concat(" ");
    b.concat(Object.values(a[i]));
  }
}

// 4. 각 쿼리를 수행한 후에 다시 교집합을 통해 데이터 정제하기
let a;
let b;

const abc = reportQuery.map(async (data) => {
  switch (data.query) {
    case "detectionDate":
      a = await fetchDetectionDateReportRecord(data.data);
      break;

    case "reporterName":
      b = await fetchReporterNameReportRecord(data.data);
      break;

    default:
  }
});

await Promise.all(abc);

const aaaa = a.data.filter((it) => {
  console.log(it);
  b.data.includes(it);
});

// 5. 각 메서드 별로 결과값을 내올 때
// Split by query
let findReportQueryResponse;

switch (reportQuery.query) {
  case "detectionDate":
    findReportQueryResponse = await fetchDetectionDateReportRecord(
      reportQuery.data
    );
    break;
  case "reporterName":
    findReportQueryResponse = await fetchReporterNameReportRecord(
      reportQuery.data
    );
    break;
  case "carNumber":
    findReportQueryResponse = await fetchCarNumberReportRecord(
      reportQuery.data
    );
    break;
  case "reportNumber":
    findReportQueryResponse = await fetchReportNumberReportRecord(
      reportQuery.data
    );
    break;
  case "processingStatus":
    findReportQueryResponse = await fetchProcessingStatusReportRecord(
      reportQuery.data
    );
    break;

  default:
    console.log("check query");
}
