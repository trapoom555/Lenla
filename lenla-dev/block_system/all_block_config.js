import { BLOCK_TYPE } from "../block_system/stringConfig";
let allBlocks = [
    {
        groupName: "Inputs",
        blocksData: [
            { name: "Constant", type: BLOCK_TYPE.IN_CONSTANT },
            { name: "String", type: BLOCK_TYPE.IN_STRING },
            { name: "Slider", type: BLOCK_TYPE.IN_SLIDER },
            { name: "Button", type: BLOCK_TYPE.IN_BASIC_BUTTON },
        ],
    },

    {
        groupName: "Operations",
        blocksData: [
            { name: "Sum", type: BLOCK_TYPE.OP_SUM },
            { name: "Product", type: BLOCK_TYPE.OP_PRODUCT },
            { name: "Power", type: BLOCK_TYPE.OP_POWER },
            { name: "Log", type: BLOCK_TYPE.OP_LOG },
        ],
    },
    {
        groupName: "Converter",
        blocksData: [
            { name: "Sig2Num", type: BLOCK_TYPE.CON_SIG2NUM },
            { name: "Sig2Bool", type: BLOCK_TYPE.CON_SIG2BOOL },
        ],
    },

    {
        groupName: "Outputs",
        blocksData: [
            { name: "Number Display", type: BLOCK_TYPE.OUT_NUMBER_DISPLAY },
            { name: "String Display", type: BLOCK_TYPE.OUT_STRING_DISPLAY },
        ],
    },
];
export default allBlocks;
