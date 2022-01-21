import React from 'react';
import BaseBlockWithoutHeader from '../base_blocks/base_block_without_header';

  const NumberDisplayBlock = ({ data }) => {
    return (
      <BaseBlockWithoutHeader data={data} inputId={"number_in"} bgColor={'#9b92fc'} isImgLabel={true} showInLabel={false} imgPath={'/../public/ic_gauge.png'} blk_height={70} blk_width={70}/>
    );
  };

export default NumberDisplayBlock