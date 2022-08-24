package com.bnksys.innerProject.service;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.bnksys.innerProject.FileUploadProperties;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@Transactional
public class FileServiceImpl implements FileService {
	private final Path dirLocation;

	@Autowired
	public FileServiceImpl(FileUploadProperties fileUploadProperties) {
		this.dirLocation = Paths.get(fileUploadProperties.getLocation()).toAbsolutePath().normalize();
	}

	@PostConstruct
	public void init() {
		try {
			Files.createDirectories(this.dirLocation);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	
	@Override
	public String saveFile(MultipartFile multipartFile, long pl_fileName) {

		String originalfileName = multipartFile.getOriginalFilename();
		String[] tmpstr=originalfileName.split("\\.");
		
		
		if(tmpstr.length<=1)
			throw new IllegalStateException("유효하지 않은 확장자입니다");
		
		String fileName = Long.toString(pl_fileName)+"."+tmpstr[tmpstr.length-1];
		
		Path location = this.dirLocation.resolve(fileName);
		try {			
			/* 실제 파일이 upload 되는 부분 */
			Files.copy(multipartFile.getInputStream(), location, StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException e) {
			e.printStackTrace();
		}

		return fileName;
	}
	
	@Override
	public String saveFileByString(String str, long pl_fileName, String fileExtension) {		
		File file=null;
		BufferedWriter writer = null;
		String fileName = Long.toString(pl_fileName)+"."+fileExtension;
		
		Path location = this.dirLocation.resolve(fileName);
		
		file = new File(location.toUri());
		
		
		try {
			//파일생성
			file.createNewFile();
			writer = new BufferedWriter(new FileWriter(file, true));
			writer.write(str);
	        writer.flush();
	        writer.close();
//			Path newFilePath = Files.createFile(location);
		} catch (IOException e) {
			e.printStackTrace();
		}

		return fileName;
	}

	@Override
	public Resource loadFile(String fileName) throws FileNotFoundException {

		try {
			Path file = this.dirLocation.resolve(fileName).normalize();
			Resource resource = new UrlResource(file.toUri());

			if (resource.exists() || resource.isReadable()) {
				return resource;
			} else {
				throw new FileNotFoundException("파일을 찾을 수 없습니다");
			}
		} catch (MalformedURLException e) {
			throw new FileNotFoundException("파일을 다운받을 수 없습니다");
		}

	}
}
