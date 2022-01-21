import React from 'react';
import BaseBlockWithoutHeader from '../base_blocks/base_block_without_header';
  const Sig2NumBlock = ({ data }) => {
    return (
      <BaseBlockWithoutHeader data={data} textLabel={"Sig2Num"} inputId={"number_in"} outputId={"number_out"} bgColor={'#86C4D9'} showOutLabel={false} showInLabel={false} blk_width={120} />
    );
  };

export default Sig2NumBlock