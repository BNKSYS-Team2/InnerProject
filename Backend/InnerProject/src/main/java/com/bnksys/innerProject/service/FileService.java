package com.bnksys.innerProject.service;

import java.io.FileNotFoundException;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
	//파일저장
	public String saveFile(MultipartFile multipartFile, long fileName);
	//문자열으로 파일 생성하여 저장
	public String saveFileByString(String str, long pl_fileName, String fileExtension);
	//파일불러오기
	public Resource loadFile(String fileName) throws FileNotFoundException;
}
