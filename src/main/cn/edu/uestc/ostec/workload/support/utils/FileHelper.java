/*
 * Project: AEMS（工程认证达成度评价管理系统）
 * File: FileHelper.java
 * Author: 刘文哲
 * Email: liuwnzh@163.com
 * Date: 2017年5月24日
 * Copyright: Copyright (c) 2017 OSTEC. All rights reserved.
 */

package cn.edu.uestc.ostec.workload.support.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.math.BigInteger;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.validation.constraints.NotNull;

import static cn.edu.uestc.ostec.workload.support.utils.ObjectHelper.isNull;

/**
 * Description: 文件工具类 Version:v1.0 (author:刘文哲 update: 无 )
 */
public class FileHelper {

	private FileHelper() {
	}

	/**
	 * 默认文件扩展名分隔符
	 */
	private static final String DEFAULT_FILE_EXTENSION_SEPARATOR = ".";

	/**
	 * 文件名与扩展名的间距
	 */
	private static final int FILE_SPOT_EXTENSION_STEP = 1;

	/**
	 * 文件名字符串开始位置
	 */
	private static final int FILE_NAME_STRING_INDEX_START = 0;

	/**
	 * 默认的字符串结果
	 */
	private static final String DEFAULT_RESULT_STRING = "";

	/**
	 * md5摘要名称
	 */
	private static final String MD5_DIGEST_NAME = "MD5";

	/**
	 * 16进制
	 */
	private static final int RADIX = 16;

	/**
	 * 生成文件路径
	 *
	 * @param baseDir  目录名称
	 * @param fileName 文件名称
	 * @return 生成文件路径
	 */
	public static String buildFilePath(
			@NotNull
					String baseDir,
			@NotNull
					String fileName) {
		if (isNull(fileName) || isNull(baseDir)) {
			return DEFAULT_RESULT_STRING;
		}
		if (baseDir.endsWith(getFileSeparator())) {
			return baseDir + fileName;
		}

		return baseDir + getFileSeparator() + fileName;
	}

	/**
	 * 获取文件扩展名
	 *
	 * @param fileName 文件名
	 * @return 返回文件扩展名
	 */
	public static String getFileExtension(
			@NotNull
					String fileName) {
		if (isNull(fileName)) {
			return DEFAULT_RESULT_STRING;
		}
		return fileName.substring(
				fileName.lastIndexOf(DEFAULT_FILE_EXTENSION_SEPARATOR) + FILE_SPOT_EXTENSION_STEP);
	}

	public static String buildFileNameWithTime(
			@NotNull
					String fileName) {
		if (isNull(fileName)) {
			return DEFAULT_RESULT_STRING;
		}

		return getFileSimpleName(fileName) + "-" + DateHelper.getCurrentTimestamp()
				+ DEFAULT_FILE_EXTENSION_SEPARATOR + getFileExtension(fileName);
	}

	/**
	 * 获取文件名（不带扩展名）
	 *
	 * @param fileName 文件名
	 * @return 获取文件名
	 */
	public static String getFileSimpleName(String fileName) {
		if (isNull(fileName)) {
			return DEFAULT_RESULT_STRING;
		}
		return fileName
				.substring(fileName.lastIndexOf(getFileSeparator()) + FILE_SPOT_EXTENSION_STEP,
						fileName.lastIndexOf(DEFAULT_FILE_EXTENSION_SEPARATOR));
	}

	/**
	 * 获取文件名（带扩展名）
	 *
	 * @param fileName 文件名
	 * @return 获取文件名
	 */
	public static String getFileName(String fileName) {
		if (isNull(fileName)) {
			return DEFAULT_RESULT_STRING;
		}
		return fileName
				.substring(fileName.lastIndexOf(getFileSeparator()) + FILE_SPOT_EXTENSION_STEP);
	}

	/**
	 * 获取文件的md5摘要
	 *
	 * @param file 文件
	 * @return 返回文件的md5摘要
	 * @throws NoSuchAlgorithmException 系统不支持md5时抛出异常
	 * @throws IOException              读文件时可能存在异常
	 */
	public static final String getFileMd5Digest(
			@NotNull
					File file) throws NoSuchAlgorithmException, IOException {

		//获取文件的字节数组
		FileInputStream fileInputStream = new FileInputStream(file);
		MappedByteBuffer mappedByteBuffer = fileInputStream.getChannel()
				.map(FileChannel.MapMode.READ_ONLY, 0, file.length());

		//生成md5校验和
		MessageDigest md5 = MessageDigest.getInstance(MD5_DIGEST_NAME);
		md5.update(mappedByteBuffer);

		//用长整型保存校验和
		BigInteger bigInteger = new BigInteger(1, md5.digest());

		//以16进制返回
		return bigInteger.toString(RADIX);
	}

	/**
	 * 获取文件系统分隔符
	 *
	 * @return 获取文件系统分隔符
	 */
	private static final String getFileSeparator() {
		return File.separator;
	}

	public static void clearFiles(String workspaceRootPath) {
		File file = new File(workspaceRootPath);
		if (file.exists()) {
			deleteFile(file);
		}
	}

	private static void deleteFile(File file) {
		if (file.isDirectory()) {
			File[] files = file.listFiles();
			for (int i = 0; i < files.length; i++) {
				deleteFile(files[i]);
			}
		}
		file.delete();
	}
}
