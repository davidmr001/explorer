import React, { Component } from 'react';
import { observable, computed, toJS } from 'mobx'
import { observer, inject } from 'mobx-react';
import nj from 'nornj';
import { registerTmpl } from 'nornj-react';
import { autobind } from 'core-decorators';

import 'flarej/lib/components/antd/table';
import 'flarej/lib/components/antd/pagination';
import 'flarej/lib/components/antd/radio';
import 'flarej/lib/components/antd/button';
import 'flarej/lib/components/antd/cascader';
import 'flarej/lib/components/antd/datePicker';
import 'flarej/lib/components/antd/checkbox';

import Message from 'flarej/lib/components/antd/message';
import Notification from 'flarej/lib/components/antd/notification';

import styles from './user.m.scss';
import tmpls from './user.t.html';

// 页面容器组件
@registerTmpl('User')
@inject('store')
@observer
export default class User extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { store: { user, header } } = this.props;
    header.setSelectMenu(['user']);
    user.getUser({
      ledgers:this.props.store.common.getDefaultLedger(),
      keyword:'_all_'
    });
  }

  @computed get tableColumns() {
    return [{
      title: '用户公钥',
      dataIndex: 'public_key',
      key:'name'
    }, {
      title: '用户地址',
      dataIndex: 'address',
      key:'describe'
    }, {
      title: '用户公钥算法',
    }, {
      title: '用户根哈希'
    }];
  }

  render() {
    const { store: { user } } = this.props;
    return tmpls.container(this.state, this.props, this, {
      styles,
      user,
      tableData: toJS(user.tableData),
    });
  }
}
