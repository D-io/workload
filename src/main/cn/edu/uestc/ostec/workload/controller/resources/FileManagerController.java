package cn.edu.uestc.ostec.workload.controller.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

import cn.edu.uestc.ostec.workload.controller.core.ApplicationController;
import cn.edu.uestc.ostec.workload.converter.impl.FileConverter;
import cn.edu.uestc.ostec.workload.dto.FileDto;
import cn.edu.uestc.ostec.workload.pojo.File;
import cn.edu.uestc.ostec.workload.pojo.RestResponse;
import cn.edu.uestc.ostec.workload.service.FileService;

import static cn.edu.uestc.ostec.workload.controller.core.PathMappingConstants.FILE_INFO_PATH;
import static cn.edu.uestc.ostec.workload.support.utils.DateHelper.getCurrentTimestamp;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Description: 文件管理控制器（负责发布、接收文件信息）
 */
@RestController
@RequestMapping(FILE_INFO_PATH)
public class FileManagerController extends ApplicationController {

	@Autowired
	private FileService fileService;

	@Autowired
	private FileConverter fileConverter;

	/**
	 * 发布文件
	 *
	 * @param fileDto 接收前端发来的文件参数
	 * @return 发布成功则返回200响应
	 */
	@RequestMapping(method = POST)
	public RestResponse publish(FileDto fileDto) {

		fileDto.setCreateTime(getCurrentTimestamp());
		fileDto.setUserId(getUserId());

		File file = fileConverter.dtoToPo(fileDto);
		boolean isSaveSucceed = fileService.saveFile(file);
		if (!isSaveSucceed) {
			return systemErrResponse("文件保存失败");
		}

		Map<String, Object> data = getData();
		data.put("fileDto", fileConverter.poToDto(file));

		return successResponse(data);
	}

	/**
	 * 接收文件
	 *
	 * @param fileId 文件编号，可选项
	 * @param option 额外选项，值暂定"all"，可选项
	 * @return 接收成功返回200状态码，否则返回错误消息
	 */
	@RequestMapping(method = GET)
	public RestResponse receive(@RequestParam(required = false) Integer fileId,
			@RequestParam(required = false) String option) {
		if (fileId == null && null == option) {
			return parameterNotSupportResponse();
		}

		List<File> fileList;
		File file;
		Map<String, Object> data = getData();

		if ("all".equals(option)) {
			fileList = fileService.getFiles(getUserId());
			data.put("fileList", fileConverter.poListToDtoList(fileList));
			return successResponse(data);
		}

		file = fileService.getFile(fileId);
		if (File.FILE.equals(file)) {
			return invalidOperationResponse();
		}
		data.put("file", fileConverter.poToDto(file));

		return successResponse(data);
	}

}
