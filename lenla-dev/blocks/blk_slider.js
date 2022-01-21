import React from 'react';
import BaseBlockWithoutHeader from '../base_blocks/base_block_without_header';
  const SliderBlock = ({ data }) => {
    console.log("basic button", data.port.out.length)
    return (
      <BaseBlockWithoutHeader data={data} textLabel={"Slider"} outputId={"number_out"} bgColor={'#2c8143'} showOutLabel={false}/>
    );
  };

export default SliderBlock