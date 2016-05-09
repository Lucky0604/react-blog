/**
 * Created by lucky on 16-5-10.
 */
import React, {Component} from 'react';

export default class State extends Component {
    render() {
        let {loading, error, data} = this.props;

        return (
            <section className="content">
                {loading ? '正在努力加载中...' :
                error ? '网络错误，请稍后重试...':
                data.status !== 'success'? data.msg: ''}
            </section>
        )
    }
}