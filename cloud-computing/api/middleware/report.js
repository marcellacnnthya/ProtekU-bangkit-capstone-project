class Report {
    constructor(reportId, nameReporter, emailReporter, description, dateReport, locationReport) {
            this.reportId = reportId;
            this.nameReporter = nameReporter;
			this.emailReporter = emailReporter;
			this.description = description;
			this.dateReport = dateReport;
			this.locationReport = locationReport;

    }
}

module.exports = Report;