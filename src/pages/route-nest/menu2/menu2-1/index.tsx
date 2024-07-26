import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Image, message, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";

const { Dragger } = Upload;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});

const base_url = "http://127.0.0.1:8001/";

export default function Menu2And1() {
	const [uploaded_file_names, set_uploaded_file_names] = useState<any[]>([]);
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const props: UploadProps = {
		name: "file",
		multiple: true,
		action: base_url + "upload-images/",
		onChange(info) {
			const { status } = info.file;
			if (status !== "uploading") {
				// console.log(info.file, info.fileList);
			}
			if (status === "done") {
				message.success(`${info.file.name} file uploaded successfully.`);
				// console.log(info.fileList.map((elem) => elem.response?.info));
				// set_uploaded_file_names(
				// 	info.fileList.map((elem) => elem.response?.info)
				// );
			} else if (status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		onDrop(e) {
			console.log("Dropped files", e.dataTransfer.files);
		},
	};
	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as FileType);
		}

		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
	};

	return (
		<>
			<Dragger {...props}>
				<p className="ant-upload-drag-icon">
					<InboxOutlined />
				</p>
				<p className="ant-upload-text">
					Click or drag file to this area to upload
				</p>
				<p className="ant-upload-hint">
					Support for a single or bulk upload. Strictly prohibited from
					uploading company data or other banned files.
				</p>
			</Dragger>
			{previewImage && (
				<Image
					wrapperStyle={{ display: "none" }}
					preview={{
						visible: previewOpen,
						onVisibleChange: (visible) => setPreviewOpen(visible),
						afterOpenChange: (visible) => !visible && setPreviewImage(""),
					}}
					src={previewImage}
				/>
			)}
		</>
	);
}
