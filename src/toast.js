import React from 'react'
// import './style.css'

export const loader=<div class="spinner-border text-light" role="status">
<span className="visually-hidden">Loading...</span>
</div>
export const toastSimple=<div className="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
<div className="d-flex">
  <div className="toast-body">
    Mise à jour réussie.
  </div>
  <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
</div>
</div>
// export const IconLink=<a className="icon-link" href="">
// <svg className="bi" aria-hidden="true"><use xlink:href="#box-seam"></use></svg>
// Icon link
// </a>
export default function Toast(){

    const toastTrigger = document.getElementById('liveToastBtn')
// const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
//   const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    // toastBootstrap.show()
  })
}

return <>
<button type="button" class="btn btn-primary" id="liveToastBtn">Show live toast</button>

<div class="toast-container position-fixed bottom-0 end-0 p-3">
  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <img src="..." class="rounded me-2" alt="..."/>
      <strong class="me-auto">Server</strong>
      <small>11 mins ago</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      ✔ <br/> Misae à jour éussie
    </div>
  </div>
</div>
</>
}