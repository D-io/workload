package cn.edu.uestc.ostec.workload.dao;

import cn.edu.uestc.ostec.workload.pojo.Item;

public interface ItemDao {

    /**
     * 根据主键删除工作量对象
     * @param itemId 工作量对象Id
     * @return int
     */
    int deleteByPrimaryKey(Integer itemId);

    /**
     * 插入工作量对象
     * @param record 工作量对象
     * @return int
     */
    int insert(Item record);

    /**
     *
     * @param record
     * @return
     */
    int insertSelective(Item record);

    /**
     * 根据主键查询工作量对象
     * @param itemId 工作量对象Id
     * @return Item
     */
    Item selectByPrimaryKey(Integer itemId);

    /**
     * 根据主键修改工作量对象
     * @param record 工作量对象
     * @return int
     */
    int updateByPrimaryKey(Item record);
}