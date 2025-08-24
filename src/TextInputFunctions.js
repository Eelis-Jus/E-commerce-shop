
const characterlimiter = (event, Length, setstate) =>{
    if(event.target.value.length > Length) {
        return true;
    }
    setstate(event.target.value);
}

const inputCheck = (isnumber, Minlength, testString, elementName) =>{
    let newstring=testString.replace(/\s+/g, ''); //remove whitespaces from string so you can't make x just whitespaces
    const myarray = newstring.split("")

    if(myarray.Length<Minlength){
        return `${elementName} needs to be atleast ${Minlength} characters long`
    }

    if(isnumber==true){
        for(let i=0; i<myarray.length; i++){
            if(myarray[i]!=/[0-9]/){
                return(`${elementName} can only include numbers and whitespaces`)
            }
        }

        return true;

    }else{
        for(let i=0; i<myarray.length; i++){
            if(myarray[i]!=/[0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/){
                return(`${elementName} can only include normal letters and whitespaces`)
            }
        }
        return true;
    }
}

let testString='hdjsfoaueahogwuiewaghoiufhnaoglkjhwepganuawepougnhiopjmegrstrfeayuihowwdetuasfgfgtueyrshrotyuijyuipthojkuipoylkop,uiåjigkmypuohfgjnuighybuidf64t578r7589y680i6u79ijkpyuohjnufgghdbyfigyijuhotjipmyuweouthnmohtweiumaahrdsjaekiuglpiuöguyrdhrwqahqwehtrejyrtktyuiklryujjnmnbvdfgiytefghkkjhgfddfughfiyubsdinvpernmgbpfyhjoprusehygiywegfysdbghrlejhpfgkhpoifgmdpklhngfhnperhtoiuhewoathfgdfhgouierhp'

export {characterlimiter, testString, inputCheck }