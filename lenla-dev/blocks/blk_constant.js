import React from "react";
import { Handle } from "react-flow-renderer";
import BaseBlockWithHeader from "../base_blocks/base_block_with_header";

const ConstantBlockStyle = {
    background: "#f7955c",
    color: "#FFF",
    width: "100px",
    height: "100px",
    borderRadius: "15px",
};

const ConstantBlock = ({data}) => {
    return (
        <BaseBlockWithHeader data={data} headerLabel={"Constant"} textLabel={data.info[0].value} bgColor={"#f7955c"} blk_height={90}/>
    );
};

export default ConstantBlock;
