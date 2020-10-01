function buscaCep(){
    event.preventDefault()
    const valorCep = document.querySelector('input[name=cep]')
    const cep = valorCep.value.replace('-','')
    console.log(cep)

    if(cep.length > 0){
        const validaCep = /^[0-9]{8}$/; // Fórmula para validação de CEP obtido no viacep  

        if(validaCep.test(cep)){
            const xhr = new XMLHttpRequest()
            xhr.open("GET", "https://viacep.com.br/ws/"+cep+"/json");
            xhr.onreadystatechange = function() {
                xhr.addEventListener("load", function(){
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200){                            
                            preencheCampos(JSON.parse(xhr.responseText))                            
                        }
                    }else{
                        alert("Falha na requisição.")
                    }
                }) 
            }                                  
            xhr.send()
        }else{
            limpaForm()
            alert("Formato de CEP inválido.")
        }
    }else{
        limpaForm()
        alert("Informe o CEP.")
    }
}

function preencheCampos(json){
    document.querySelector('input[name=endereco]').value = json.logradouro
    document.querySelector('input[name=bairro]').value = json.bairro 
    document.querySelector('input[name=complemento]').value = json.complemento
    document.querySelector('input[name=cidade]').value = json.localidade
    document.querySelector('input[name=estado]').value = json.uf
}

function limpaForm(){
    document.querySelector('input[name=cep]').value = ""
    document.querySelector('input[name=endereco]').value = ""
    document.querySelector('input[name=bairro]').value = "" 
    document.querySelector('input[name=complemento]').value = ""
    document.querySelector('input[name=cidade]').value = ""
    document.querySelector('input[name=estado]').value = ""
}

const btnBuscar = document.querySelector('button')
btnBuscar.addEventListener('click', buscaCep)