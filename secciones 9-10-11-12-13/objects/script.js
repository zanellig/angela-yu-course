'use strict';

function HouseKeeper(name,age,isVirgin,wagePerHour){
    this.name = name;
    this.age = age;
    this.isVirgin = isVirgin;
    this.wagePerHour = wagePerHour;
    this.clean = ()=>{
        alert(`${this.name} is cleaning your house now.`)
    }
}