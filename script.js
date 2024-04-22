$(document).ready(function() {
    $.getJSON('https://dolarapi.com/v1/dolares', function(data) {
        $('#fromCurrency').append(`<option value="ARS" data-venta="ARS">ARS</option>`);
        $('#toCurrency').append(`<option value="ARS" data-venta="ARS">ARS</option>`);
        for (let i = 0; i < data.length; i++) {
            let fecha = new Date(data[i].fechaActualizacion);
            let fechaFormateada = fecha.toLocaleString("es-AR", { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
            $('#ratesCards').append(`
                <div class="col-sm-4 col-md-auto">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${data[i].nombre}</h5>
                            <p class="card-text">Compra: ${data[i].compra} - Venta: ${data[i].venta}</p>
                            <p class="card-text"><small class="text-muted">Última actualización: ${fechaFormateada}</small></p>
                        </div>
                    </div>
                </div>
            `);
            
            $('#fromCurrency').append(`<option value="${data[i].compra}" data-venta="${data[i].venta}">${data[i].nombre}</option>`);
            $('#toCurrency').append(`<option value="${data[i].compra}" data-venta="${data[i].venta}">${data[i].nombre}</option>`);
        }
    });

    $('#conversionForm').submit(function(e) {
        e.preventDefault();
        const fromCurrencyName = $('#fromCurrency option:selected').text();
        const toCurrencyName = $('#toCurrency option:selected').text();
        if (fromCurrencyName !== 'ARS' && toCurrencyName !== 'ARS') {
            alert('Al menos una de las monedas debe ser ARS');
            return;
        }
        if(fromCurrencyName == 'ARS' && toCurrencyName == 'ARS') {
            alert('No se puede convertir de ARS a ARS');
            return;
        }
        const amount = $('#amount').val();
        const fromCurrencyCompra = $('#fromCurrency').val();
        const fromCurrencyVenta = $('#fromCurrency option:selected').data('venta');
        const toCurrencyCompra = $('#toCurrency').val();
        const toCurrencyVenta = $('#toCurrency option:selected').data('venta');
        let resultCompra, resultVenta;
        if(fromCurrencyName == 'ARS') {
            resultCompra = amount / toCurrencyCompra;
            resultVenta = amount / toCurrencyVenta;
        } else {
            resultCompra = amount * fromCurrencyCompra;
            resultVenta = amount * fromCurrencyVenta;
        }
        $('#result').html(`Compra: ${resultCompra.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}<br>Venta: ${resultVenta.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`);
    });

    $('#swapButton').click(function() {
        const fromCurrency = $('#fromCurrency').val();
        const toCurrency = $('#toCurrency').val();
        $('#fromCurrency').val(toCurrency);
        $('#toCurrency').val(fromCurrency);
    });

});