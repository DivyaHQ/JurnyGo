const Colors = {
    primary: "#363e49",
    primarylite: "#2d374140",
    secondary: "#444262",
    btnPrimary: '#6369f5',
    liteBtnPrimary: '#9498f2',
    btnPrimaryHover: '#4c50cc',
    btnPurple: '#383c91',
    btnPurpleHover: '#4f52c0',
    liteRed: '#f27e88',
    lightRed: '#f0b9bd',
    btnDanger: '#aa032d',
    btnDangerHover: '#830927',
    btnSuccess: '#28a745',
    btnSuccessHover: '#0a6e22',
    btnWarning: '#ffc107',
    btnWarningHover: '#916d03',
    btnInfo: '#17a2b8',
    btnInfoHover: '#057586',
    cardBg: '#0c0d20',
    cardBgLite: '#344c64',
    gray: "#83829A",
    gray2: "#878c88",
    grey: 'grey',
    gainsboro: 'gainsboro',
    white: '#fff',
    litewhite: "#F3F4F8",
    semiWhtie: '#dedede',
    lightWhite: "#FAFAFC",
    offWhite: '#ededfb',
    red: 'tomato',
    black: '#000000',
    opBlack:'rgba(0,0,0,.7)',
    lightBlack: '#495057',
    darkblue: 'darkblue',
    yellow: '#cce302',
    cardYellow: '#FEE800',
    card25: '#C15200',
    cardChoco: '#C43900',
    cardTeal: '#016C5A',
    cardRed: '#C10116',
    cardSky: '#1361B1',
    cardDarkBlue: '#0D0743',
    cardPurple: '#671375',
    cardGrey: '#778D98',
    defaultGrey: '#F2F2F2',
    
}
const FontWeight = {
    regular: "DMRegular",
    medium: "DMMedium",
    bold: "DMBold",
};

const FontSize = {
    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 32,
};
const Titles = {
    medium: {
        fontSize: FontSize.medium,
        color: Colors.white
    },
    darkMedium: {
        fontSize: FontSize.medium,
        color: Colors.black
    }
    ,
    small: {
        fontSize: FontSize.small,
        color: Colors.white,
        marginVertical: 10,
    },
    darkSmall: {
        fontSize: FontSize.small,
        color: Colors.white,
        marginVertical: 10,
    }
}
const randomColor = () => {
    return '#000000'.replace(/0/g, function () {
        return Math.round(Math.random() * 16).toString(16);
    });
}
const Shadows = {
    small: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    medium: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5,
    },
};

export { Colors, Titles, FontWeight, FontSize, Shadows, randomColor };