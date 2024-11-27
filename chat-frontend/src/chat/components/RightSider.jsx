import React from "react";
import { Avatar, List, Typography, Dropdown, Menu } from "antd";
import { EllipsisOutlined, EyeOutlined, FileAddOutlined } from "@ant-design/icons";

const { Text } = Typography;

const posts = [
    {
        _id: "1",
        title: "Post Title 1",
        poster_id: "123",
        product_id: {
            images: [
                "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
            ]
        },
        status: "Pending",
        location: "Hanoi, Vietnam",
        is_deleted: false,
    },
    {
        _id: "2",
        title: "Post Title 2",
        poster_id: "124",
        product_id: "prod1",
        status: "Approved",
        location: "Ho Chi Minh City, Vietnam",
        is_deleted: false,
    },
    {
        _id: "3",
        title: "Post Title 2",
        poster_id: "124",
        product_id: "prod1",
        status: "Approved",
        location: "Ho Chi Minh City, Vietnam",
        is_deleted: false,
    },
    {
        _id: "4",
        title: "Post Title 2",
        poster_id: "124",
        product_id: "prod1",
        status: "Approved",
        location: "Ho Chi Minh City, Vietnam",
        is_deleted: false,
    },
    {
        _id: "5",
        title: "Post Title 2",
        poster_id: "124",
        product_id: "prod1",
        status: "Approved",
        location: "Ho Chi Minh City, Vietnam",
        is_deleted: false,
    },
    {
        _id: "6",
        title: "Post Title 2",
        poster_id: "124",
        product_id: "prod1",
        status: "Approved",
        location: "Ho Chi Minh City, Vietnam",
        is_deleted: false,
    },
    {
        _id: "7",
        title: "Post Title 2",
        poster_id: "124",
        product_id: "prod1",
        status: "Approved",
        location: "Ho Chi Minh City, Vietnam",
        is_deleted: false,
    },
    {
        _id: "8",
        title: "Post Title 2",
        poster_id: "124",
        product_id: "prod1",
        status: "Approved",
        location: "Ho Chi Minh City, Vietnam",
        is_deleted: false,
    },
];

const RightSider = () => {
    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<EyeOutlined />}>
                Chi tiết
            </Menu.Item>
            <Menu.Item key="2" icon={<FileAddOutlined />}>
                Tạo đơn
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="flex flex-col w-1/4 bg-white p-4 border-l border-gray-300 w-1/4">
            <div className="flex items-center justify-between mb-6">
                <Text strong>Danh sách post bạn có</Text>
            </div >
            <List className="scrollable-content"
                itemLayout="horizontal"
                dataSource={posts}
                renderItem={(post) => (
                    <List.Item className=" transition-colors duration-200 cursor-pointer rounded-lg p-10" style={{ padding: "10px" }}>
                        <Avatar
                            src={post.product_id.images ? post.product_id.images[0] : null}
                            alt="Post Avatar"
                            className="mr-4"
                        />
                        <List.Item.Meta
                            title={<Text strong>{post.title}</Text>}
                            description={<Text type="secondary">{post.location}</Text>}
                        />

                        <Dropdown overlay={menu} trigger={['click']}>
                            <EllipsisOutlined className="text-gray-500 cursor-pointer" />
                        </Dropdown>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default RightSider;
