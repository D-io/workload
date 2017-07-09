package cn.edu.uestc.ostec.workload.converter.impl;

import java.text.ParseException;

import cn.edu.uestc.ostec.workload.converter.Converter;
import cn.edu.uestc.ostec.workload.dto.ItemDto;
import cn.edu.uestc.ostec.workload.pojo.Item;
import cn.edu.uestc.ostec.workload.support.utils.ObjectHelper;

/**
 * Version:v1.0 (description:  )
 */
public class ItemConverter implements Converter<Item,ItemDto> {

	@Override
	public ItemDto poToDto(Item po) {

		if(ObjectHelper.isNull(po)){
			return null;
		}

		return null;
	}

	@Override
	public Item dtoToPo(ItemDto dto) throws ParseException {

		if(ObjectHelper.isNull(dto)){
			return null;
		}

		return null;
	}
}
