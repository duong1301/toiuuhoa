function run(){
    let row = 0;
    let col = 0;
    let a = [];
    let b = [];
    let c = [];
    let data2 = [];
    let cj = [];
    let cs = [];
    let pa = [];
    let anphu = [];
    let dentaTemp = [];
    let denta=[];
    let A = [];
    let dongxoay;
    let cotxoay;
    //Khoi tao du lieu
    function init(){    
        row =5;//số ràng buộc
        col =4;//số biến
        c.push(35,40,25,35);//hệ số hàm mục tiêu
        b.push(3000,3000,300,3000,7000);//vế phải hàm ràng buộc        
    //ma trận hệ số hàm ràng buộc  
        a.push([2,2,3,3]);
        a.push([0,0,6,5]);
        a.push([0,1,0,1]);
        a.push([6,5,0,0]);
        a.push([7,7,7,7]);
    //  
    //tao ma tran bien phu  
        for(let i = 0; i < row; ++i){
            anphu.push([]);
            for(let j= 0; j < row; ++j){
                if(i == j)
                    anphu[i].push(1);
                else 
                    anphu[i].push(0);
            }
        } 
        
        for(let i = 0; i < row; ++i){
            a[i] = [...a[i],...anphu[i]]
        }
        A = a;//ma tran he so

        for(let i = 0; i < col + row; ++i){
            if(i >= col){
                cs.push(i);//Khoi tao co so
                cj.push(0);//Khoi tao cj          
                c.push(0);//them he so cua bien phu
            }
            dentaTemp.push(0);
        }    
        pa = b;//khoi tao phuong an ban dau
    }
    function calc(){ 
        denta = dentaTemp.map(function(val, index){
            let s = 0;
            for(let i = 0; i < row; i++){
                s += cj[i]*A[i][index] ;           
            }
            return s- c[index];
        })//tinh denta
        cotxoay = denta.indexOf(Math.min(...denta));//tim cot xoay
        //tim dong xoay
        let tmp=pa.map(function(val, index){        
            if(A[index][cotxoay] <=0)
            return Infinity;
            return pa[index]/A[index][cotxoay];
        })
        dongxoay = tmp.indexOf(Math.min(...tmp));
        //
        
    }
    function solve(){        
        
        console.log("pa",pa)  ;
        calc();
        console.log("denta",denta);   

        cs[dongxoay] = cotxoay;//co so moi
        cj[dongxoay] = c[cotxoay];//cj moi
        let pttruc = A[dongxoay][cotxoay];
        let dongchinh = A[dongxoay].map(function(val, index){
            return val/pttruc;
        });//tinh dong chinh
        A[dongxoay] = dongchinh;
        pa[dongxoay] = pa[dongxoay]/pttruc;//pa moi tai dong xoay
        //tinh cac dong khac
        for(let i = 0 ; i < row;++i){
            if(i !== dongxoay){
                let dongK = A[i].map(function(val, index){
                    return val - dongchinh[index]*A[i][cotxoay];
                })
                pa[i] =pa[i] - A[i][cotxoay]*pa[dongxoay];
                A[i] = dongK;
            }            
        } 
        //
        
    }
        init();
        calc();
        while(true){
            //kiem tra denta
            let check = denta.every(function(val){
                return val >=0;
            })
            if(check)
                break;
            solve();
        }
        //in ra console
        console.log("cs",cs);
        let X = c.map(function(){
            return 0;
        })
        cs.forEach(function(val,index){
            X[val] = pa[index];
        })
                
        X.length = col;
        console.log("X",X);
        let result = X.reduce(function(pre,cur,index){
            return pre + cur*c[index];
        },0)
        console.log("F",result);
        //

        //in ket qua
        let F = X.map(function(val, index){
            return `${val}x${c[index]}`;
        })
        
        
        let output = document.querySelector("#output");
        output.innerHTML = `
            <p>X = (${X.join(",")})</p>
            <p>F = ${F.join(" + ")} = ${result}</p>    
        `
        //
}






