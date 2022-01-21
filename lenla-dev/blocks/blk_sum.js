import React from 'react';
import BaseBlockWithoutHeader from '../base_blocks/base_block_without_header';
  const SumBlock = ({ data }) => {
    return (
      <BaseBlockWithoutHeader data={data} textLabel={"Sum"} inputId={"number_in"} outputId={"number_out"} bgColor={'#86C4D9'} showOutLabel={false} />
    );
  };

export default SumBlock