export default function Sider(){
  return (
    <div className="h-full shadow-md relative"
    >
      <ul className="menu bg-base h-full w-full">
        <li><a className="text-[inherit] hover:text-[inherit]">Item 1</a></li>
        <li>
          <details open>
            <summary>Parent</summary>
            <ul>
              <li><a className="text-[inherit] hover:text-[inherit]">Submenu 1</a></li>
              <li><a className="text-[inherit] hover:text-[inherit]">Submenu 2</a></li>
              <li>
                <a className="text-[inherit] hover:text-[inherit]">Parent</a>
                <ul>
                  <li><a className="text-[inherit] hover:text-[inherit]">Submenu 1</a></li>
                  <li><a className="text-[inherit] hover:text-[inherit]">Submenu 2</a></li>
                </ul>
              </li>
            </ul>
          </details>
        </li>
        <li><a className="text-[primary] active">Item 3</a></li>
      </ul>

    </div>
  )
}