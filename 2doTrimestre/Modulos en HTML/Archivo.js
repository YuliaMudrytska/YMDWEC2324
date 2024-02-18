        /*
        sintaxis
        <script scr="archivo.js" type="module">/<script>

        en el archivo js que va a importar los ejementos:
        import{elemento1, elemento2,...} from "ruta"

        en el modulo del que se va a hacer la import:
        export definicion_de_funcion_variable_constante_o_clase
        export{elementos_separados_por_comas}
         */

        //exportar un único elemento
        export const cadenaMayuscula = str=> str.toUpperCase()

        const NUEROPI = 3.14;
        const NUMEROE = 2.71;
        const NUMEROCERO = 0.00;

        //export más de un elemento
        export{NUEROPI, NUMEROE, NUMEROCERO};