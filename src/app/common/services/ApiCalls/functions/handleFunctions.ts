import { HttpHeaders } from '@angular/common/http';
import { Consts } from '../../../consts/const';

export class handleFunction {

    public hireExtendingMoney = [];
    public headerPost: HttpHeaders;
    public yearNames = [];
    public days = [];
    public date = new Date();
    public monthNames = [];
    public MorseCryptedFinalCode = "";

    genaratemonthNames() {
        return this.monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"]
    }

    generateYears() {
        this.yearNames.push(2018);
        for (let i = 0; i < 100; i++) {
            this.yearNames.push(this.date.getFullYear() + i)
        } return this.yearNames;
    }

    generateDays() {
        for (let i = 1; i < 32; i++) { this.days.push(i); } return this.days;
    }

    getMonthNumber(month) {
        switch (month) {
            case "January": return 1
            case "February": return 2
            case "March": return 3
            case "April": return 4
            case "May": return 5
            case "June": return 6
            case "July": return 7
            case "August": return 8
            case "September": return 9
            case "October": return 10
            case "November": return 11
            case "December": return 12
        }
    }
    generateMonthName(month) {
        switch (month) {
            case "01": return "January"
            case "02": return "February"
            case "03": return "March"
            case "04": return "April"
            case "05": return "May"
            case "06": return "June"
            case "07": return "July"
            case "08": return "August"
            case "09": return "September"
            case "10": return "October"
            case "11": return "November"
            case "12": return "December"
        }
    }

    sliceDate(day, monthno, year) {
        if (day[0] == 0) { day = day.slice(1, 2); }
        if (monthno[0] == 0) { monthno = monthno.slice(1, 2); }
        let convertedDate = this.getDate(day, monthno, year);
        return convertedDate;
    }

    getDate(day, monthno, year) {
        if (day < 10 && day > 0) {
            if (monthno < 10 && monthno > 0) { return year + "-0" + monthno + "-0" + day; }
            else { return year + "-" + monthno + "-0" + day; }
        }
        else {
            if (monthno < 10 && monthno > 0) { return year + "-0" + monthno + "-" + day; }
            else { return year + "-" + monthno + "-" + day; }
        }
    }

    createHeader() {
        this.headerPost = new HttpHeaders();
        this.headerPost.append('Content-Type', 'application/x-www-form-urlencoded');
    }
}