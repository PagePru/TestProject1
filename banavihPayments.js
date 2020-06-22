***** se agrega este comentario el 21062020a las 23:11
***** se agrega este comentario el 21062020a las 23:35
*
*
var msjError = "Por favor verifique los campos resaltados en color rojo. Para más detalles, haga clic en el icono de alerta.";
var msjError2= "Por favor seleccione al menos un \"Período de Pago\" antes de hacer clic en el botón \"Continuar\".";
var arrMonth = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
		"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ];
var enableValidation = false;
var formIsValid = true;
var seleccionPeriodo = false;
//var selectionOfPaymentComboBox = false;
var errorSelectionOfPaymentComboBox = false;
var errorExceedsBalance = false;

function formatTypePayroll(type){
    if (type === "F"){
        return "Fiscalización";
    }
       return "Regular";
}

function formatDate(date){
    var month = arrMonth[parseInt(date.substring(0,2))-1];
    var year = date.substring(2,6);
    return month + " - " + year;
}

function numberFormat(value){
    value += '';
    var x = value.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? ',' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    var val = x1 + x2;
    if(val.indexOf(',')<0)
        return val +',00';
    else return val;
}

function parseToFloat(a){
    return parseFloat(a.replace(/\./g,'').replace(',','.'));
}

function parsePaymentForm(){
    $('select option[value!=""]').each(function(value,element){
        var text = $(element).text();
        element.label = text;
    });
}

function unlockAndShow(e){
	$('#clear').addClass('clearHover').on('click',{"scope":e.data.scope}, reset);
    $('.tableData').find('td').css('opacity','1');
	$('#tableList').find('tr').unbind('click').on('click',{"scope":e.data.scope},verifyAndShow);
	$("select").removeAttr('disabled');
    $("#submitForm").removeAttr("disabled");
    $(this).trigger('click');
}

function verifyAndShow(e){
     if (formIsValid) {
         $('#payMethod').val() != '' ? e.data.scope[0].confirmPay(true):e.data.scope[0].confirmPay(false);
         e.data.scope[0].show($(this));
     }
  }

function reset (e){
    $('#banavihPayeeListForm')[0].reset();
    $('#MuestraErrorMessageSelectionPayment').hide();
    $('.error').removeClass('error');
    $('#summary').css('display','none');
    enableValidation = false;
    formIsValid = true;
    seleccionPeriodo = false;
    errorSelectionOfPaymentComboBox = false;
    errorExceedsBalance = false;
    e.data.scope[0].confirmPay(false);
    e.data.scope[0].tickAndPay('');
    $('#warn-'+e.data.scope[0].getCurrentPosition()).hide();
    $('#warn-'+e.data.scope[0].getCurrentPosition()).css('display','none');
    $("#payMethod option:selected").removeAttr("selected");
    $("#payMethod").trigger("change");
}
