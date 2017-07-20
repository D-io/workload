

package cn.edu.uestc.ostec.workload.event;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import cn.edu.uestc.ostec.workload.pojo.FileInfo;

/**
 * Description: 文件上传事件
 */
public interface FileEvent extends IEvent {

	/**
	 * 服务名称
	 */
	String EVENT_NAME = "fileEvent";

	/**
	 * 文件上传事件
	 *
	 * @param file     文件实体
	 * @param fileInfo 文件信息实体
	 * @return 上传成功则返回true
	 * @throws IOException 文件存储到磁盘可能会出异常
	 */
	@Transactional
	boolean uploadFile(MultipartFile file, FileInfo fileInfo) throws IOException;

	/**
	 * 文件下载
	 */
	@Transactional
	FileInfo downloadFile(int fileInfoId);

}
