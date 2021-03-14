import React, { useState, useEffect } from 'react';
import '../styles/Home.module.css'
import { message, Input, Modal, Form } from 'antd';

export default function Home(props) {
  let flag = true;
  const FormItem = Form.Item;
  const [ list, setList ] = useState(null)
  const [ visible, setVisible ] = useState(false)
  const [ name, setName ] = useState('')
  const [ url, setUrl ] = useState('')

  useEffect(async () => {
    console.log('componentDidMount')
    let dataList = [{"name":"拉勾教育","url":"https://kaiwu.lagou.com/","img":"https://kaiwu.lagou.com/favicon.ico"}];
    if(localStorage.dataList) {
      dataList = JSON.parse(localStorage.dataList)
    }else {
      localStorage.dataList = JSON.stringify(dataList);
    }
    setList(dataList)
  }, [])


  const search = (e) => {
    const value = e.target.value.trim();
    if(value !== '') {
      window.open(`https://www.baidu.com/s?wd=${value}&rsv_spt=1&rsv_iqid=0xa318870f0004be24&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=baiduhome_pg&rsv_enter=0&rsv_dl=tb&oq=%25E5%25AE%259D&rsv_btype=t&rsv_t=b0a6xvSx80EANNLE04gYp%2BzLhpsGoWH9gnOAYtDU3xiLkocBnHnUdzGcCncxgY5jWZep&rsv_pq=92e8ebad000f2751&rsv_sug=9`);
    }
  }

  const addShow = () => {
    flag = true;
    setVisible(true)
  }

  const handleOk = () => {
    const list = localStorage.dataList ? JSON.parse(localStorage.dataList) : [];
    if(name.trim() === '') {
      console.log('??')
      message.warning('请输入名称');
      return;
    }
    if(list.some(item => item.name === name)) {
      message.warning('该快捷方式名称已存在，请重新输入');
      return;
    }
    if(url.trim() === '') {
      message.warning('请输入网址');
      return;
    }
    if(!/^((https|http|ftp|rtsp|mms){0,1}(:\/\/){0,1})(www|v)\.(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/i.test(url)) {
      message.warning('网址格式不正确');
      return;
    }
    
    if(!flag) {
      return;
    }
    flag = false;
    const obj = {
      name,
      url
    }
    const urlArr = url.split('/');
    const icon = urlArr[0] + '//' + urlArr[2] + '/favicon.ico';
    const img = new Image();
    img.src = icon;
    img.onload = () => {
      obj.img = icon;
      list.push(obj);
      console.log(list)
      console.log('成功')
      setVisible(false)
      setList(list)
      localStorage.dataList = JSON.stringify(list)
    }
    img.onerror = () => {
      list.push(obj);
      console.log('失败')
      setVisible(false)
      setList(list)
      localStorage.dataList = JSON.stringify(list)
    }
  }
  //https://www.baidu.com

  const handleCancel = () => {
    setVisible(false)
  }


  return (
    <div className="container">
      <div className="main">
        <div className="logo">Baidu</div>
        <Input className="search" onPressEnter={search} placeholder="请输入搜索词，回车进行搜索" />
        <div className="quick-wrap">
          {
            list && list.map((item, index) => {
              return <a key={index} href={item.url} target="_blank" className="quick-box">
                        <div className="quick-img">
                          {!!item.img && <img src={item.img} />}
                          {!item.img && <span>{item.name.substring(0,1)}</span>}
                        </div>
                        <div className="quick-text">{item.name}</div>
                      </a>
            })
          }
          <div className="quick-box" onClick={addShow}>
            <div className="quick-img quick-add">
              +
            </div>
            <div className="quick-text">添加快捷方式</div>
          </div>
        </div>
      </div>
      <Modal title="添加快捷方式" visible={visible}
        onOk={handleOk} onCancel={handleCancel}
        okText="添加" cancelText="取消"
      >
        <Form>
          <FormItem
            label="名称"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
          >
            <Input value={name} onInput={(e)=>{setName(e.target.value)}} placeholder="请输入名称" />
          </FormItem>
          <FormItem
            label="网址"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
          >
            <Input value={url} onInput={(e)=>{setUrl(e.target.value)}} placeholder="请输入网址" />
          </FormItem>
        </Form>
      </Modal>
    </div>
  )
}
