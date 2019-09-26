import React, { PureComponent } from 'react'
import { Breadcrumb } from 'antd'

const BreadcrumbItem = Breadcrumb.Item 
class Breadcrumbs extends PureComponent {

  render() {
    return (
      <Breadcrumb>
        <BreadcrumbItem href=''>Home</BreadcrumbItem>
        <BreadcrumbItem>
          <a href="">Application Center</a>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <a href="">Application List</a>
        </BreadcrumbItem>
        <BreadcrumbItem>An Application</BreadcrumbItem>
      </Breadcrumb>
    )
  }
}
export default Breadcrumbs