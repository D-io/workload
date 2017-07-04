package cn.edu.uestc.ostec.workload.dao;

import org.springframework.stereotype.Component;

import cn.edu.uestc.ostec.workload.pojo.Item;

@Component
public interface ItemDao extends BaseDao<Item> {

    /**
     * 插入工作量对象
     * @param entity 工作量对象
     * @return Boolean
     */
    @Override
    Boolean insert(Item entity);

    /**
     * 根据主键修改工作量对象
     * @param entity 工作量对象
     * @return int
     */
    @Override
    Boolean update(Item entity);

    /**
     * 根据主键删除工作量对象
     * @param id 工作量对象Id
     * @return Boolean
     */
    @Override
    Boolean delete(Integer id);

    /**
     * 根据主键查询工作量对象
     * @param id 工作量对象Id
     * @return Item
     */
    @Override
    Item select(Integer id);
}