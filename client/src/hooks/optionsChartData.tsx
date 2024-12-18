export const useOptionsChartData = () => {
  const createChartData = (apiData: any) => {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Init newchartData
    const newchartData = Array.from({ length: daysInMonth }, (_, i) => {
      return {
        date: `${year}-${String(month + 1).padStart(2, "0")}-${String(
          i + 1
        ).padStart(2, "0")}`,
        certificateLogtotal: 0,
        Studenttotal: 0,
      };
    });

    const certificateCounts: any = {};
    apiData?.result?.allAudLogCertificate?.forEach((cert: any) => {
      const createdDate = new Date(cert.createdAt);
      if (
        createdDate.getMonth() === month &&
        createdDate.getFullYear() === year
      ) {
        const day = createdDate.getDate();
        certificateCounts[day] = (certificateCounts[day] || 0) + 1;
      }
    });

    const studentCounts: any = {};
    apiData?.result?.allStudents?.forEach((student: any) => {
      const createdDate = new Date(student.createdAt);
      if (
        createdDate.getMonth() === month &&
        createdDate.getFullYear() === year
      ) {
        const day = createdDate.getDate();
        studentCounts[day] = (studentCounts[day] || 0) + 1;
      }
    });

    newchartData?.forEach((dayData: any) => {
      const day = parseInt(dayData.date.split("-")[2]);
      dayData.certificateLogtotal = certificateCounts[day] || 0;
      dayData.Studenttotal = studentCounts[day] || 0;
    });

    return newchartData;
  };

  const chartData = [
    { date: "2024-09-01", certificateLogtotal: 222, Studenttotal: 150 },
    { date: "2024-09-02", certificateLogtotal: 97, Studenttotal: 180 },
    { date: "2024-09-03", certificateLogtotal: 167, Studenttotal: 120 },
    { date: "2024-09-04", certificateLogtotal: 242, Studenttotal: 260 },
    { date: "2024-09-05", certificateLogtotal: 373, Studenttotal: 290 },
    { date: "2024-09-06", certificateLogtotal: 301, Studenttotal: 340 },
    { date: "2024-09-07", certificateLogtotal: 245, Studenttotal: 180 },
    { date: "2024-09-08", certificateLogtotal: 409, Studenttotal: 320 },
    { date: "2024-09-09", certificateLogtotal: 59, Studenttotal: 110 },
    { date: "2024-09-10", certificateLogtotal: 261, Studenttotal: 190 },
    { date: "2024-09-11", certificateLogtotal: 327, Studenttotal: 350 },
    { date: "2024-09-12", certificateLogtotal: 292, Studenttotal: 210 },
    { date: "2024-09-13", certificateLogtotal: 342, Studenttotal: 380 },
    { date: "2024-09-14", certificateLogtotal: 137, Studenttotal: 220 },
    { date: "2024-09-15", certificateLogtotal: 120, Studenttotal: 170 },
    { date: "2024-09-16", certificateLogtotal: 138, Studenttotal: 190 },
    { date: "2024-09-17", certificateLogtotal: 446, Studenttotal: 360 },
    { date: "2024-09-18", certificateLogtotal: 364, Studenttotal: 410 },
    { date: "2024-09-19", certificateLogtotal: 243, Studenttotal: 180 },
    { date: "2024-09-20", certificateLogtotal: 89, Studenttotal: 150 },
    { date: "2024-09-21", certificateLogtotal: 137, Studenttotal: 200 },
    { date: "2024-09-22", certificateLogtotal: 224, Studenttotal: 170 },
    { date: "2024-09-23", certificateLogtotal: 138, Studenttotal: 230 },
    { date: "2024-09-24", certificateLogtotal: 387, Studenttotal: 290 },
    { date: "2024-09-25", certificateLogtotal: 215, Studenttotal: 250 },
    { date: "2024-09-26", certificateLogtotal: 75, Studenttotal: 130 },
    { date: "2024-09-27", certificateLogtotal: 383, Studenttotal: 420 },
    { date: "2024-09-28", certificateLogtotal: 122, Studenttotal: 180 },
    { date: "2024-09-29", certificateLogtotal: 315, Studenttotal: 240 },
    { date: "2024-09-30", certificateLogtotal: 454, Studenttotal: 380 },
    { date: "2024-10-01", certificateLogtotal: 165, Studenttotal: 220 },
    { date: "2024-10-02", certificateLogtotal: 293, Studenttotal: 310 },
    { date: "2024-10-03", certificateLogtotal: 247, Studenttotal: 190 },
    { date: "2024-10-04", certificateLogtotal: 385, Studenttotal: 420 },
    { date: "2024-10-05", certificateLogtotal: 481, Studenttotal: 390 },
    { date: "2024-10-06", certificateLogtotal: 498, Studenttotal: 520 },
    { date: "2024-10-07", certificateLogtotal: 388, Studenttotal: 300 },
    { date: "2024-10-08", certificateLogtotal: 149, Studenttotal: 210 },
    { date: "2024-10-09", certificateLogtotal: 227, Studenttotal: 180 },
    { date: "2024-10-10", certificateLogtotal: 293, Studenttotal: 330 },
    { date: "2024-10-11", certificateLogtotal: 335, Studenttotal: 270 },
    { date: "2024-10-12", certificateLogtotal: 197, Studenttotal: 240 },
    { date: "2024-10-13", certificateLogtotal: 197, Studenttotal: 160 },
    { date: "2024-10-14", certificateLogtotal: 448, Studenttotal: 490 },
    { date: "2024-10-15", certificateLogtotal: 473, Studenttotal: 380 },
    { date: "2024-10-16", certificateLogtotal: 338, Studenttotal: 400 },
    { date: "2024-10-17", certificateLogtotal: 499, Studenttotal: 420 },
    { date: "2024-10-18", certificateLogtotal: 315, Studenttotal: 350 },
    { date: "2024-10-19", certificateLogtotal: 235, Studenttotal: 180 },
    { date: "2024-10-20", certificateLogtotal: 177, Studenttotal: 230 },
    { date: "2024-10-21", certificateLogtotal: 82, Studenttotal: 140 },
    { date: "2024-10-22", certificateLogtotal: 81, Studenttotal: 120 },
    { date: "2024-10-23", certificateLogtotal: 252, Studenttotal: 290 },
    { date: "2024-10-24", certificateLogtotal: 294, Studenttotal: 220 },
    { date: "2024-10-25", certificateLogtotal: 201, Studenttotal: 250 },
    { date: "2024-10-26", certificateLogtotal: 213, Studenttotal: 170 },
    { date: "2024-10-27", certificateLogtotal: 420, Studenttotal: 460 },
    { date: "2024-10-28", certificateLogtotal: 233, Studenttotal: 190 },
    { date: "2024-10-29", certificateLogtotal: 78, Studenttotal: 130 },
    { date: "2024-10-30", certificateLogtotal: 340, Studenttotal: 280 },
    { date: "2024-10-31", certificateLogtotal: 178, Studenttotal: 230 },
    { date: "2024-11-01", certificateLogtotal: 178, Studenttotal: 200 },
    { date: "2024-11-02", certificateLogtotal: 470, Studenttotal: 410 },
    { date: "2024-11-03", certificateLogtotal: 103, Studenttotal: 160 },
    { date: "2024-11-04", certificateLogtotal: 439, Studenttotal: 380 },
    { date: "2024-11-05", certificateLogtotal: 88, Studenttotal: 140 },
    { date: "2024-11-06", certificateLogtotal: 294, Studenttotal: 250 },
    { date: "2024-11-07", certificateLogtotal: 323, Studenttotal: 370 },
    { date: "2024-11-08", certificateLogtotal: 385, Studenttotal: 320 },
    { date: "2024-11-09", certificateLogtotal: 438, Studenttotal: 480 },
    { date: "2024-11-10", certificateLogtotal: 155, Studenttotal: 200 },
    { date: "2024-11-11", certificateLogtotal: 92, Studenttotal: 150 },
    { date: "2024-11-12", certificateLogtotal: 492, Studenttotal: 420 },
    { date: "2024-11-13", certificateLogtotal: 81, Studenttotal: 130 },
    { date: "2024-11-14", certificateLogtotal: 426, Studenttotal: 380 },
    { date: "2024-11-15", certificateLogtotal: 307, Studenttotal: 350 },
    { date: "2024-11-16", certificateLogtotal: 371, Studenttotal: 310 },
    { date: "2024-11-17", certificateLogtotal: 475, Studenttotal: 520 },
    { date: "2024-11-18", certificateLogtotal: 107, Studenttotal: 170 },
    { date: "2024-11-19", certificateLogtotal: 341, Studenttotal: 290 },
    { date: "2024-11-20", certificateLogtotal: 408, Studenttotal: 450 },
    { date: "2024-11-21", certificateLogtotal: 169, Studenttotal: 210 },
    { date: "2024-11-22", certificateLogtotal: 317, Studenttotal: 270 },
    { date: "2024-11-23", certificateLogtotal: 480, Studenttotal: 530 },
    { date: "2024-11-24", certificateLogtotal: 132, Studenttotal: 180 },
    { date: "2024-11-25", certificateLogtotal: 141, Studenttotal: 190 },
    { date: "2024-11-26", certificateLogtotal: 434, Studenttotal: 380 },
    { date: "2024-11-27", certificateLogtotal: 448, Studenttotal: 490 },
    { date: "2024-11-28", certificateLogtotal: 149, Studenttotal: 200 },
    { date: "2024-11-29", certificateLogtotal: 103, Studenttotal: 160 },
    { date: "2024-11-30", certificateLogtotal: 446, Studenttotal: 400 },
  ];

  const createMonthlyTotals = (apiData: any) => {
    // Initialize chartData with all months
    const chartData = [
      { month: "January", Studenttotal: 0, certificateLogtotal: 0 },
      { month: "February", Studenttotal: 0, certificateLogtotal: 0 },
      { month: "March", Studenttotal: 0, certificateLogtotal: 0 },
      { month: "April", Studenttotal: 0, certificateLogtotal: 0 },
      { month: "May", Studenttotal: 0, certificateLogtotal: 0 },
      { month: "June", Studenttotal: 0, certificateLogtotal: 0 },
      { month: "July", Studenttotal: 0, certificateLogtotal: 0 },
      { month: "August", Studenttotal: 0, certificateLogtotal: 0 },
      { month: "September", Studenttotal: 0, certificateLogtotal: 0 },
      { month: "October", Studenttotal: 0, certificateLogtotal: 0 },
      { month: "November", Studenttotal: 0, certificateLogtotal: 0 },
      { month: "December", Studenttotal: 0, certificateLogtotal: 0 },
    ];

    // Process certificates
    apiData.result.allAudLogCertificate.forEach((cert: any) => {
      const createdDate = new Date(cert.createdAt);
      const monthIndex = createdDate.getMonth();
      chartData[monthIndex].certificateLogtotal += 1;
    });

    // Process students
    apiData.result.allStudents.forEach((student: any) => {
      const createdDate = new Date(student.createdAt);
      const monthIndex = createdDate.getMonth();
      chartData[monthIndex].Studenttotal += 1;
    });

    return chartData;
  };

  const chartData2 = [
    { month: "January", Studenttotal: 186, certificateLogtotal: 80 },
    { month: "February", Studenttotal: 305, certificateLogtotal: 200 },
    { month: "March", Studenttotal: 237, certificateLogtotal: 120 },
    { month: "April", Studenttotal: 73, certificateLogtotal: 190 },
    { month: "May", Studenttotal: 209, certificateLogtotal: 130 },
    { month: "June", Studenttotal: 214, certificateLogtotal: 140 },
    { month: "July", Studenttotal: 214, certificateLogtotal: 40 },
    { month: "August", Studenttotal: 214, certificateLogtotal: 90 },
    { month: "September", Studenttotal: 214, certificateLogtotal: 20 },
    { month: "October", Studenttotal: 214, certificateLogtotal: 140 },
    { month: "November", Studenttotal: 214, certificateLogtotal: 50 },
    { month: "December", Studenttotal: 214, certificateLogtotal: 170 },
  ];

  return {
    createChartData,
    chartData,
    createMonthlyTotals,
    chartData2,
  };
};
