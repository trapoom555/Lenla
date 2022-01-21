import React from 'react';
import BaseBlockWithoutHeader from '../base_blocks/base_block_without_header';
  const ProductBlock = ({ data }) => {
    return (
      <BaseBlockWithoutHeader data={data} textLabel={"Product"} inputId={"number_in"} outputId={"number_out"} bgColor={'#86C4D9'} showOutLabel={false} blk_width={120} />
    );
  };

export default ProductBlock