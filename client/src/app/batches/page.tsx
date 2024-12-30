'use client';
import React, { useState } from 'react';
import {
  Layout,
  Form,
  Input,
  Upload,
  Button,
  Typography,
  Modal,
  Progress,
  message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

const Page = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFileCount, setSelectedFileCount] = useState(0);

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
    setSelectedFileCount(fileList.length); // Update selected file count
  };

  const handleFormSubmit = (values: any) => {
    if (!fileList.length) {
      message.error('Please upload at least one resume.');
      return;
    }

    setIsModalVisible(true);
    setUploading(true);

    // Simulate upload process (replace with actual upload logic)
    let currentCount = 0;
    const totalFiles = fileList.length;

    const interval = setInterval(() => {
      currentCount += 1;
      setUploadProgress(Math.round((currentCount / totalFiles) * 100));

      if (currentCount === totalFiles) {
        clearInterval(interval);
        setUploading(false);
        setIsModalVisible(false);
        setFileList([]); // Clear file list after upload
        setSelectedFileCount(0); // Reset file count after upload
        message.success('All resumes uploaded successfully!');
      }
    }, 1000); // Simulate each file upload taking 1 second
  };

  return (
    <Layout style={{ minHeight: '100vh', padding: '20px' }}>
      <Content>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <Title level={2}>Upload Resumes for Job Posting</Title>
          <Text type="secondary">
            Enter the job description and upload resumes in bulk for analysis.
          </Text>
          <Form
            layout="vertical"
            onFinish={handleFormSubmit}
            style={{ marginTop: 30 }}
          >
            {/* Job Description */}
            <Form.Item
              label="Job Description"
              name="jobDescription"
              rules={[
                { required: true, message: 'Please enter a job description.' },
              ]}
            >
              <TextArea
                placeholder="Enter job description here..."
                rows={5}
                maxLength={1000}
                showCount
              />
            </Form.Item>

            {/* Resume Upload */}
            <Form.Item
              label="Upload Resumes"
              valuePropName="fileList"
              extra="Upload multiple resumes in PDF or DOC format"
            >
              <Upload
                multiple
                fileList={[]} // Hide file list thumbnails
                onChange={handleUploadChange}
                beforeUpload={() => false} // Prevent automatic upload
                accept=".pdf,.doc,.docx"
              >
                <Button icon={<UploadOutlined />}>Select Files</Button>
              </Upload>
              {/* Counter for selected files */}
              <div style={{ marginTop: 10 }}>
                <Text>
                  {selectedFileCount} /{' '}
                  {selectedFileCount > 1 ? selectedFileCount : 0} resumes
                  selected
                </Text>
              </div>
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* Modal for Upload Progress */}
        <Modal
          title="Uploading Resumes"
          visible={isModalVisible}
          footer={null}
          closable={false}
        >
          <Progress percent={uploadProgress} status="active" />
          <Text>{`Uploading ${uploadProgress}% completed`}</Text>
          <div style={{ marginTop: 10 }}>
            <Text type="secondary">
              {`Estimated time left: ${(
                (fileList.length - (uploadProgress / 100) * fileList.length) *
                1
              ).toFixed(0)} seconds`}
            </Text>
          </div>
        </Modal>
      </Content>
    </Layout>
  );
};

export default Page;
