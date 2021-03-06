import React from 'react'
import { render } from 'react-dom'
import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Input
} from 'antd';
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import { createForm, FormItem, setInternalFormItem } from '../src'
import { toJS, observable } from 'mobx'
import { observer } from 'mobx-react'
import DemoForm from './DemoForm'

const AntdFormItem = Form.Item
setInternalFormItem(AntdFormItem)

@observer
class Demo extends React.Component {

  @observable page = 1;

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(fields => console.log('error', fields))
      .then((values) => console.log('success', values))
  }

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  render() {
    const { getFieldProps, getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Button onClick={() => this.page = 2}>TEST</Button>
        <FormItem
          label="Nation"
        >
          <span className="ant-form-text">China</span>
        </FormItem>
        {this.page === 2 &&
          <FormItem hasFeedback>
            <Input
              {...getFieldProps('nest.input', {
                rules: { required: true, message: 'Please input something!' },
                validateTrigger: 'onBlur',
              })}
              placeholder="Input here"
            />
          </FormItem>
        }
        <FormItem
          hasFeedback
        >
          {getFieldDecorator('select', {
            rules: [
              { required: true, message: 'Please select your country!' },
            ],
          })(
            <Select
              placeholder="Please select a country"
            >
              <Option value="china">China</Option>
              <Option value="use">U.S.A</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          label="Select[multiple]"
          hasFeedback
        >
          <Select {...getFieldProps('selectMultiple')}>
            <Option value="red">Red</Option>
            <Option value="green">Green</Option>
            <Option value="blue">Blue</Option>
          </Select>
        </FormItem>

        <FormItem
          label="InputNumber"
        >
          <InputNumber
            min={1}
            max={10}
            {...getFieldProps('inputNumber', {
              // initialValue only work when use default
              initialValue: 1,
            })}
          />
          <span className="ant-form-text"> machines</span>
        </FormItem>

        <FormItem
          label="Switch"
        >
          <Switch {...getFieldProps('switch', { valuePropName: 'checked' })}/>
        </FormItem>

        <FormItem
          label="Slider"
        >
          <Slider
            marks={{ 0: 'A', 20: 'B', 40: 'C', 60: 'D', 80: 'E', 100: 'F' }}
            {...getFieldProps('slider')}
          />
        </FormItem>

        <FormItem
          label="Radio.Group"
        >
          <RadioGroup
            {...getFieldProps('radioGroup')}
          >
            <Radio value="a">item 1</Radio>
            <Radio value="b">item 2</Radio>
            <Radio value="c">item 3</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem
          label="Radio.Button"
        >
          <RadioGroup
            {...getFieldProps('radioButton')}
          >
            <RadioButton value="a">item 1</RadioButton>
            <RadioButton value="b">item 2</RadioButton>
            <RadioButton value="c">item 3</RadioButton>
          </RadioGroup>
        </FormItem>

        <FormItem
          label="Upload"
          extra="longgggggggggggggggggggggggggggggggggg"
        >
          <Upload
            name="logo"
            action="/upload.do"
            listType="picture"
            {...getFieldProps('upload', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })}
          >
            <Button>
              <Icon type="upload" /> Click to upload
            </Button>
          </Upload>
        </FormItem>

        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    );
  }
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const WrappedDemo = createForm({ defaultItemProps: formItemLayout })(Demo);

const store = new DemoForm()

render(<WrappedDemo store={store} />, document.getElementById('main'))