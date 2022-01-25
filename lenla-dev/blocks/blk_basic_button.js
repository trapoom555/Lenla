import React from 'react';
import BaseBlockWithoutHeader from '../base_blocks/base_block_without_header';
  const BasicButtonBlock = ({ data }) => {
    console.log("basic button", data.port.out.length)
    return (
      <BaseBlockWithoutHeader data={data} textLabel={"Button"} inputId={"number_in"} outputId={"number_out"} bgColor={'#2c8143'} showOutLabel={false} showInLabel={false} />
    );
  };

export default BasicButtonBlock