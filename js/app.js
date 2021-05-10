const ingresos=[];

const egresos=[];

let cargarApp=()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = ()=>{

    let totalIngreso = 0;

    for(let ingreso of ingresos){
        totalIngreso+=ingreso.getValor;
    }

    return totalIngreso;
}

let totalEgresos = ()=>{

    let totalEgreso=0;

    for(let egreso of egresos){
        totalEgreso+=egreso.getValor;        
    }

    return totalEgreso;
}

let cargarCabecero = () =>{

    let presupuestoTotal=totalIngresos()-totalEgresos();
    let porcentajeEgreso=totalEgresos()/totalIngresos();
   
    document.getElementById("presupuesto").innerHTML=formatoMoneda(presupuestoTotal);        
    document.getElementById("porcentaje").innerHTML=formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerHTML=formatoMoneda(totalIngresos());
    document.getElementById("egresos").innerHTML=formatoMoneda(totalEgresos());

}

const formatoMoneda = (valor)=>{
    
   return valor.toLocaleString("es-AR", {style:"currency", currency:"ARS", minimumFractionDigits:2});
    
}

const formatoPorcentaje=(valor)=>{
    
    return valor.toLocaleString("es-AR", {style:"percent", minimumFractionDigits:2});
}

const cargarIngresos = ()=>{

    let ingresosHTML = "";

    for(let ingreso of ingresos){
        ingresosHTML+= crearIngresoHTML(ingreso);
    }

    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;

}

const crearIngresoHTML = (ingreso)=>{

    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.getDescripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda(ingreso.getValor)}</div>    
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
               <ion-icon name="close-circle-outline"
               onclick='eliminarIngreso(${ingreso.getId})'></ion-icon>
            </button>
        </div>                   
    </div>
</div>    
    `;

    return ingresoHTML;

}

const eliminarIngreso=(id)=>{

   let indiceEliminar = ingresos.findIndex(ingreso => ingreso.getId === id);

   ingresos.splice(indiceEliminar, 1);

   cargarCabecero();
   cargarIngresos();

}

let cargarEgresos = ()=>{

    let egresosHTML="";

    for(let egreso of egresos){
    
        egresosHTML += crearEgresoHTML(egreso);
    }

    document.getElementById("lista-egresos").innerHTML = egresosHTML;
}

const crearEgresoHTML= (egreso)=>{

    let egresoHTML=`
       
               <div class="elemento limpiarEstilos">
                   <div class="elemento_descripcion">${egreso.getDescripcion}</div>
                   <div class="derecha limpiarEstilos">
                       <div class="elemento_valor">- ${formatoMoneda(egreso.getValor)}</div>
                       <div class="elemento_porcentaje">${formatoPorcentaje(egreso.getValor/totalEgresos())}</div>
                       <div class="elemento_eliminar">
                           <button class="elemento_eliminar--btn">
                            <ion-icon name="close-circle-outline"
                            onclick='eliminarEgreso(${egreso.getId})'></ion-icon>
                           </button>
                       </div>
                   </div>
                   
               </div>
           
    `;

    return egresoHTML;

}

const eliminarEgreso= (id)=>{

    let indiceEliminar = egresos.findIndex(egreso => egreso.getId === id);

    egresos.splice(indiceEliminar, 1);
 
    cargarCabecero();
    cargarEgresos();
 
}

let agregarDato = ()=>{
    let forma=document.forms["forma"];
    let tipo=forma["tipo"];
    let descripcion=forma["descripcion"];
    let valor=forma["valor"];

    if(descripcion.value !== "" && valor.value !== ""){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value, Number(valor.value)));
            cargarCabecero();
            cargarIngresos();
        
        }else if(tipo.value === "egreso"){
            egresos.push(new Egreso(descripcion.value, Number(valor.value)));
            cargarCabecero();
            cargarEgresos();
        
        }
    }
}