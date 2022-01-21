import React from "react";
import BaseBlockWithHeader from "../base_blocks/base_block_with_header";

const StringBlock = ({data}) => {
    return (
        <BaseBlockWithHeader data={data} headerLabel={"String"} textLabel={data.info[0].value} bgColor={"#f7955c"} blk_height={90}/>
    );
};

export default StringBlock;