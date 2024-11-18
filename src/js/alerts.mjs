export default class Alert{

    constructor(category, dataSource){
        this.category = category;
        this.dataSource = dataSource;
    }

    async init(){
        const data = await this.dataSource.getData(this.category);

        this.creatAlertMessage(data);
    }

    creatAlertMessage(data){
        const main = document.querySelector("main")
        const section = document.createElement("section")
        section.setAttribute("class", "alert-list");
        data.forEach(element => {
          const para = document.createElement("p");
          para.innerHTML = `${element.message}`;
          para.style.backgroundColor = `${element.background}`;
          para.style.color = `${element.color}`;

          para.style.padding = "10px 20px";
          para.style.borderRadius = "5px"
          section.append(para); 
        });
        
        main.prepend(section);
    }
}