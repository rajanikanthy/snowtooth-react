import React from 'react';
import { Card } from 'antd';
import { Table, Icon, Button, Alert  } from 'antd';
import {TRAILS_ROOT_QUERY} from '../../container/layout';
import { Query } from 'react-apollo';

const TrailDashboard = () => {
    const columns = [{
        title: 'Trail',
        dataIndex: 'name',
        key: 'name'
    }, {
        title: 'Status',
        dataIndex: 'status',
        key: 'status', 
        render: (status) => {
            if (status === 'OPEN') {
                return (<Icon type='check-circle' theme='outlined' style={{ fontSize: '30px', color: 'green' }}/>)
            } else if (status === 'CLOSED') {
                return (<Icon type='stop' theme='outlined' style={{ fontSize: '30px', color: 'red' }}/>)
            } else {
                return <p>{status}</p>
            }
        }
    }, {
        title: 'Difficulty',
        dataIndex: 'difficulty',
        key: 'difficulty',
        render: (difficulty) => {
            if (difficulty === 'beginner') {
                return (<Alert message={difficulty} type='success'/>)
            } else if (difficulty === 'expert') {
                return (<Alert message={difficulty} type='error'/>)
            } else if (difficulty === 'intermediate') {
                return (<Alert message={difficulty} type='info'/>)
            } else {
                return (<Alert message={difficulty} type='warning' />)
            }
        }
    }, {
        title: 'Groomed',
        dataIndex: 'groomed',
        key: 'groomed',
        render: (groomed) => (groomed ? "Yes" : "No")
    }, {
        title: 'Accessible By Lifts',
        dataIndex: 'accessedByLifts',
        key: 'accessedByLifts',
        render: (data) => data.map( d => d.name).join(',')
    }]


    return (
        <Query query={TRAILS_ROOT_QUERY}>
        {({ data, loading, refetch }) => {
            console.log("Fetch lift status .......");
            console.log(refetch);
            if (loading) {
                return (<div>
                    <Button type="primary" onClick={() => refetch()}>
                        Refresh
                    </Button>
                    <Table dataSource={[]} columns={columns} />
                </div>);
            } else {
                return (
                    <div>
                        <Button type="primary" onClick={() => refetch() }>
                            Refresh
                        </Button>
                        <Table dataSource={data.allTrails} columns={columns}/>
                    </div>)
            }
        }
        }
    </Query>
    )
}

export default TrailDashboard;