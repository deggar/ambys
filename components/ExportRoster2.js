import { Button } from '@mui/material';
import { Elevation, Card } from '@blueprintjs/core';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import dayjs from 'dayjs';
import excelColumnName from 'excel-column-name';

function ExportRoster({ Roster }) {
  //   console.log('Roster', Roster);
  const saveOutRoster = function () {
    console.log('exporting');
    //TODO new export file here
    createExcelArray(Roster);
  };
  return (
    <Card className="flex-shink" interactive={true} elevation={Elevation.TWO}>
      <div className="inline">
        <Button
          variant="contained"
          component="label"
          onClick={() => {
            console.log('exporting next');
            saveOutRoster(Roster);
          }}
        >
          Export Ambys Shipping Manifest
        </Button>
      </div>
    </Card>
  );
}

function createExcelArray(Roster) {
  var wsData = [];
  console.log('Roster', Roster);
  Roster.Groups.map((group) => {
    const theGroupMembers = Roster.List.filter(({ Group }) => {
      return Group == group.prefix;
    });
    if (theGroupMembers) {
      theGroupMembers.sort(function (a, b) {
        return a.Sex.localeCompare(b.Sex);
      });
      theGroupMembers.forEach((line) => {
        var theLine = [
          line.Crate,
          line.ID,
          line.CageID,
          line.EarID,
          line.RFID,
          line.EnvigoID,
          line.Sex,
          line.BirthDate,
          line.Dame,
          line.Sire,
          line.Genotype,
          line.BW,
          line.CloudyEyes,
          line.Study,
          line.Group
        ];
        wsData.push(theLine);
      });
    }
  });

  // console.log(wsData);
  createExcelFile(wsData, Roster);
}

function createExcelFile(ws_data, Roster) {
  const theStudy = Roster.Study;
  const theSpecies = Roster.List[0].Species;
  const theStrain = Roster.List[0].Strain;
  const exDate = dayjs(new Date()).format('MM/DD/YYYY');
  const logo =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANYAAAA8CAYAAAAaPETKAAAABmJLR0QA/wD/AP+gvaeTAAAdkUlEQVR42u1dCXgT1RYelCxlF9AHyFPAXVBUXJ4KTVJQ5CkItNOkC4iA7OVZaJOUgkakZbUPQcSyiJY97BTQQtsgCuizQFtAli5JFxDFBUV4j61559yZtJPkTjJJU0Sa+333azPrnZn733POf849l2HqsNgZpkFFpPztskjFH1AvlkUqzcUDmtzBBEuwBIv/xdqfaQGAugLVLqjbEHDBtxMsweKvxDIxDW2RikNOwNIqbBY10zD4doIlWKRKKK3iTQDPlnKt/FXHthI25C4A10bYfgpqEezTCYB3SwWrVJWw8keCby9YgoVSUAqVRyrO85Lpf1a2cRvHvqMsI69gFS+BjdVLeE6ZVs7CsVVw3pVyVq4NvsVgCRZKKdcq3gOgXIN6rlzXqJ1ju5llbrWxChtIrnNC+6qMDekOx17lwbg4+AaDJViglEY1/lveCEbmJIXClZ1ORDVt7XpsUQzTDI93JS7KWMULIMlMNlbZMfhGgyUonVjlEJAyvwMoUqUcD7bUMJBaBTat7AkJpMctZax8GRAdr5jg/+DbDpabrtjYkGfBBkqzsfIBjEDa2GIbtYXtC8qi5J2l0OdlOmVPUAV/r9CFRHs7tmhgSHtQK0+CNDtmBzUy+BWC5aYqdjWhy628DXQN1LUwN0mklQ8si5Tvs4bLHwzUfa2R8v5IfgC47nFWG+URQHjshTZNDPrCguXGBxB00hKWaV7BMiFukiZSsdXhg0L1z20/qGvIAtq0ypWMh86O9zgwsuPyvDH3TPEorV5vc3tRbIsLpbrGh13tt/JI5Sq+LVWVIEmDXy5YbtjyAxAKIAFyobOeB9XuLPydZx3CKKulBxc9MR6AMxxpcyqJoZV1xX2n+zKNPEmSPfGPZ3yR8MRuT+05auosPzys3dAjQ9sMdgd5yPPQxh+hPRfKdbInHduRdSxjZd0qwB92XVXHUMMjTKjxcbfa3XjbTdthehmaU58ZtweLUAooFrqEHNltkcqpvl6ngg15uiSqyfffDbljkNgxeSO6yfJM3RqJ7U+H/buMz63INv6jl9gxBYOYxpUDmFZizwC24NfQljvr/MX1TLqfURuuQrVT6tybtsOoDH2pz6wyDgiiSdgptcrVrsCCuh1VQ7MPoz86iAuHtl13YFTHtXYRJm/VnKgHV7yn+2rZv4e0oO3fmPJyl81T+1zY9lZYnA+P0ADae1zYfgDaxjp/cWr9NBFQYf2e6WtqFARWPS7F2iZdgHz4RdAxL2MUBGz7FP7/qlwre0rqtVAiIai2Tu35lMXENnHdb06LD0lfOPLcwoWjHqedD9vvXD29f4dMU19JnRLUzybExmPlbzlJXGQT65Km7zZCBp3J6gFYdkajHxgEVj0vlRy9PQbApEfbpSyauQ2o7j3QSS+Vh8ueRIdvpTbkH1KutUX/fNMNKa8UrZod+YnJZHLr3Gnm+BCzmXWThDNX6NvPW/Kv8/MXjest5T5oB4IP7Q0kTjA2EduO9Dz8Lq7z8Ci1sZdHUHF1axBYweJWkITAKAqiLrKK+YRuj5QvlXJuxmxtl6XzhxjT00fIXPe9tXFm4pQtc0a5bp+1cvJ9M1dOXpGe7lmFQvU0/42/pxXFNi+ujCEDwmhHO7HN14WG1xhWSgDWf5mw5DuDwAoWD8SE4l5QueYC60acu9ZIxaii11p29mb7TF/zTuI087SnhRsnfPZRbPzOxQuF20bkpcsSdixMNlkWNPF0wW1TevbYZejVPG/0vUmHh7bbCyFSj173l9Ej6XboSL9LABZU48QgsOp5ATvl4fJIeVQR2+R2zyBjWpZEN7UVDrvz0jdx93f1dKxp06whxu3zjsftmKcQAs5kd1YRR3656qVxu5eXmizLlGLXWpmmfXVdar+r297ulU4kk4gNdRqmqbg6lgNMWoyidKyzUE9TgHU4CKz6DKpweWe0VXhGrQwZQU/HF8Xdq8gb3ell/H/z1N7D184cuDhj/nBqEK1+59J2jN3egFQEG9hdMYd2LmfN5ltrJFaebOi3GzrRzk9Z806f9zL0S2ZnDGq86r2o2GUmtSj4MFoD7KwL5URtVSTUUcf6xr1T6dMJxU7rcD30TweBVV9VPV3IM+XcdA87mRvlw4hvnta3e0ZaTOaiD9+YwAIpkbIhpa3rMbF5nw+Pzt9pcPzWFeasjcqzkAh4bV7OPbqC3DWu58TvM7dMyMpobNowc8301W/PX7pU39QrocE5s88QdpBVHAm8tJrUheK7qgIGsCejSXye/O/GDhoXBLwdSAqpE9uA9HwSnNTPMeqkB5kXExp7PY8F0ui5hDvgOR4j7Q2b9AS5Dmu+NaDAUpsaMj0mtSXtw/ugI51zmt/YYWiE7cVvrH8NtI1k4lJR6afA840Fu/plcILfRd6hMxvRgAkzhsH+3uDbfJjsD5t8Tw1RoVUOBpZtrVWrfN2/b226xWROfTh5S9qZN7MWpQpfYp+iHQpdfs5CNm8XkYRqi6WhQ4JpC3P6aAuydcJrvXZgW7fh+zZUjP5i5Qgas+hR+kJQMNiDs2BweDHwpIV+lnuHMpxiOpvkPAVfSul0P0rq9DWq5hy45hdOVWOcyndYJVzvX1DzoV5xuc85qJuYMACam10InVxlSIH9xynnXYXrn4BnS4V23lErYPWc9Df+PkXw95obmaM27Ic6kukTp6C/X2M3t2d31O7gkJfO2nagX8e4hXpvjBpR6wFIhmIvdvNVot6r9EkAolaC+91L3ovKEAfXeRNAlhLwvjcxM731+NxPenKSKTeaPWpp4zRion9HbVwIjVgKf8eREZQvA/M+bxtVkDN8RF5mo8HfZN5YsYAsgAdB5Pay9fOdQEEnMbQ+SIQsCnizmNCEjuSjeiNMNNChVYaZRGrg4KY2DudB551sUel/JiOzX8AybABg/CbtPoYT1AEA+4facFLkvH9Lf4dEytDezYeU5+kD209JI6Oc6i/wvGO4gevNtkRrUSdqiXTW6MfXaV8EkETpCrI/G1SQ1ZiM6BqjmWr4885UkFwL8JwbUk3ADkd/wd1rjkl6hn6M/rNaAYvrbEU+fXiNcRapan2Vjx3mv8RP5yuwfK0awwVoX7i7tAG1i37OWeZ57+YAUWvVhu+o0kZj6OryTV+F57nk9zOoDCurB4Rn40OqNZPrFDfZgB/NYzw08BKjSuoRqBt6Yg39t68M6yhttxI1UGhb0Efc/zFhE++uBbD8qVX+n6svZ9RvtqhTYHH1IrHBhKWPqRl0+B9EBouh3t9fwrPUwQRVQcZeY+Ohj1Fl+LkWbT8pOdga51TBnKthjjAmmKYRCuFBL6MfC38fGtnpvi8mdH08e1LPv+HvxYuHt5+zZOLdJnDqIoU+NvvTViPyzM25gcN8K2dL8cDSGBZ58fnsQRD2+2pL0+jC7E7RhV/ehrZZ1IGssGF7N4TiJZI3pw1IXW0aP/1D420Zc6K6b0zpN3d7siYcZxkfHdpmvU0bko0EBhAws4HAsJ4JVHJQzna4QGnzHAoAp4uoWUkBAlYVp+cbPoW/n8DvIz6MsDA663fD/0vge6D2cMYDuAy1ANaP/H22ErtKY7zgsYPiaO9sZ4rFYX7LeLO5VUAWSVHHOVuQdg9oryGa2Huo1qHKqjEMBq0qA875rVqqo3YitVghNRkfb7eIA5ZiJxftrkjD39+OuXf57oRu9h1vaebh74Xpo3fPyTBcnbpu6nD9V0ubjt6z+uzgvO2V7L7PW2rzs1/RFeQUwN+3PNsfgo8OLziqMFcFKuH66EJLDLvPHBJ9aNeuod9s2QZAlSdvnfvvFPPUYzM/1WuWp8X2MM/of2r7FM1avPzhoW03WnWNf66MVGqAhInFtAHCNGy1pJjjRAx29zhKnEJBlRbGY04jpn/AOkM6trBzcXbJSAop4fp+90LneMDpXs/ENYN9y0U64mGfgaVBCYCaicnZJYLMo8bwsagUVenHOB2P0kRt+INqP4ZSbLMajQHIHf1Zyj1OExvZGbz7KMdVwjXEgxTUE1uTgVNljPep/2BcILBpG4BVI9HlyBTCFJIU6KR98fd/xj/4XI7+yUGZpjDim5mfPu7BWSsnPWYyp7XE32O/2dgq5usdzRyMn7M+m/Q8eTHiH/+82weRxEZyKh9G12P8IM56xjlZmLzGHscoAqLKqvQHKO0tcqde+eM1YJzTJE2Yh07hHVgXmbBE8XwhGrGRmtRDBES0giyZitreK0RSSwfWZc/qPLoIDB+InHvQTRIRcosKwgwP0mqAyPXfpWgWJ6ntkDL43SjFZLffwjFUwKCJf/zleCwQHXe4Rmb8qQUlkIoyICA9LW6PvSsyoi/yH1jGGV5o+idFVUdNosoLMfOWiDr4Dx+Atd7rsyH5oDZUUImFXsZOLm3qLDIQXxR1C6gNG+n2bfLdlGP3U9+VyvCOJJLkTy0guYAVHAYqYc4Qi0XJOTYNRkJVCsU7sma8IRhVaBmpy8/+ki3IfeCGeAakeWkqiTrxMQ8dtSsVjPjcaJz7TrdfIx3Nox0IfhXOV+Ruw3hzAGsMkSLqYx/pwDKOkuhjmiECTB3l2EyRe7nbf8TxDaCjuQHoPslUzyqtYRlhq6X49q4noKILc7uhcxedv1GHs51VCgQReqrRoESJgIATqI9sfs6drMXSJPpoztPagpxk9uCO2/1pBsY9lkLeQkwZ4NdzoJpEM/DRX6MBu0BlGE2tHGV8TkSVGeSHxPrVzUagOjmpwcHrvEtlfT8RYPWVDCyp88/E3Bboe3ItGNFAdxcUEfeNc7tGi4CQ7jrg7LifJDGXSJpojKmcKu6HNnW2H9O0LFrZqTZTL5ANBAm1DsKUymMKLO2d9gFAtPm5M2nnQQTGON3hHKdOhwAD6ZUO4VDv4+/4nIU+TcPA7FE8+XLg9Ag/wKXW9w8gtezorDm+A8tY6bWtYsBSGdP9j6bwAVhSYwVD9Q+JnP8+xYC+hXRqulR52cmupZMRR3hHuQjIE/8pIuU9MLJ4H6NaOnGhlXfhE7VgzOAWXxNlxllWtH9j77rJqPJFFuaEskc/b+l6jK7QYoDQpskCMM0DiUQMciQ9IIZw54BvslvRwBq/b0nLxM8/+tW0YcYmU6a0ae/wHLuqZxZDOmvf2UD9loADS62/TEJgfJNYFX4DS2346IYCFtpSdMkyn962xCiR+213AesVihT1HgGBhItaX+zjN7xK7FIpRAdMGzE65b3gJw9KKfHmtJCJWYuKR3+5pnRIXqZofkGkz/sd/6raMIzKz56INlj1fjvYAqASQhgUlfI0bE3r/M66lFQM9l02dxBrnjlwkDn+2RCx++EUEkgusxLTDJyBJDQ+geoFfTuqzh4YcL1db4GFhAgdWNNEKXSNoYQisS5Vuw8wltL9mr9LduAixc65VPI9JAhy/YZIdLzh9do2rfwhXmJB/kD513Yva1iZTOqGSz4YNnzusgnLTBZTw4lZH3Yz7DKLhnKAepjgFq5EoeUBaD3g2GOO6HexkjF30PT1KX2v7ZisTiYgGtEusMlbNIYJdQMq0mFLRB2dNzuwUIrQbazXff8W4BtFl4eKCrxFfnz1BkT6YQwgF2njzQb7SVKA9dmhTNOKcPmjdpdEmc5Y4OyvNXMGPvXJ+4MvzV88/ticlckew3WImpefcxbsrn5uNldBbiIjtOmQSczPXqorzB7rrb2Zpt5PZE0O7Yjzw46/1uoU+NyWepuoKdFBcAt0lALqKEV8MRBxIanCHC06ZQyj3SRNvQMWZzPtp75XnHIhSiIBk6rW/0qPM036J8XxfJWQYrUtGK6mNr4E19sh6tzW6PvV+j5Hh93++H/G3r/TMuGJIfj7k3kxLy5YMKaJJNr94M4n4yBESbgZpRJIsV9dWT8SCgVl2MHtd/M+MI+lcPRdtxXFNMvE3PAILAzJwuxNjky6+DfPw2DhVnByIh0Qh3xmhehGtZ2EJNU3YKn1ESIs33ceSQZO3ZslIjUqKUDdwwR07hdoVmrDZBESRe/3ZbFTIlN4YnDLtQdHdrB/Gd91jwVUQUksYcmu5kBKLNMdsnSgAS6qIDcp9rs9bpMjhxza1GLYvo2nx1iWvy21nUCtE50bQJXOT9pMgNzyMbg8K/wuhxyK0+xSACYWIaAxTPLDD/YvkYDS36iBrjcrsMikR7GgVwm5QdDJK5XBQ8JDKmDQPpMy14sjXap8speF5ThQ7o6p+RgWBOrVuxjQekoX8vfKwU1bFQ5rZ0DVS2q/ijq0KxlspsvRh3beR9UO7JaG7FEz1Ucz1rLitQk7F+Xrtyz1yROOM6KhzZ9bWdlj8Pc3lzWQPdPPGBBK161BvUi8z2dgdYdZp2JTE2jR2n9VYIWK+LHQBuHsqvMi9yhj1BK0Hm6QWi4BWJVuQb1ioCLz1qoniSZ4dN6r9eNE7LxhXgEFK3lk2MiaV4o/4O920jFhijsZ/WG1Rn+kXey3nz0Qc3DnRGr8IKHgcz8A4K0SUyExEY0Z6PYPlkicduE4FSQseSZIQOqS5feSbWCjth4iA7SikdX+FrVxt4gE/MJNZfnLSiwy1WM9b19OI53WawQ9UOSh4EuSTChBxLlX1k4/TZorxZhIUUtxQF1NIvuRTEHQqEi4V7bIfaH9yX/35vNZ5JpqGrI27ccp7qBSTRRbEMFTAb/TS4k5n9zjTaLFHMwq93TM+8sS3vswfcyPS+fGPuAruGCA2OT6XA6VUWRk+kzko/mfnEY0KgA+jGvE+V8VWL5PdLzmc5Q4Z+tke7juZUnz3khOC6m0uieV00s+E7Q7oMNVUnK4V5VoFff705dmmGc0n7z5vTP6HQtOCzMyudlSlk0thuzf1KF63halpEMUPTCQv6yaHZHqazu+BzID1L89gmf6QtTOwo9CVdvAqRs62f+lXEliFTH7wMV/Uz+AdVGSD4je1j4eristZ38PCE2iBwP7UnO95ufH2ba4jCkFWJeLwbby5/kxs23KGtP+qetTZ3s6DlU9Q9aC55IzPYcrmWezHTH2EPPDW4Z0oE4v4bM0vY9TXYQp3HBKCbG7YFVJ4RJF7h8NJiPS1Yuvak0siUat621OjNiNDiwS4+ll7pcnpyqqv54CmL2yYWT+WSHdhaF/QfJ1nocAAI1+lc/PQhzTEH4lNUEQpI8OF6xg71AFP/bn2TE3O/q7cPqHyUvKaFPmnNZTNs++ZNowfYa362aPfbDV/riHsg+OuGsNbR0sG8k/72i/fLnvnR/1buiIbjXxlVoDK9T4Iv3aUDGtlrMD1eUYvdd3w5Mucynnxng9t+ekR6ntwu00dQxJHG5y5XI+89NlD6kAqvjZDKtJQKwpAFOCakgHYT0mMj/Oi1qY0IW/3hESqiQ2IKiN5SSescfEh32+R2mEsgcA7GPomOtBfRrp6vtBo5+zWSC4FfxEYtdZP31A/IrZ2q8z0qJUXn2GELUxc2XyydkZRq/zeXBRuvyRd+8/Pqil3UZZyxiXcuVjHRFcR5lguT4FR2+MWAjF/HrADqqMUYTyRrWNxPGZGgbsXlykxQmKvZNY62tjCBTOCsdof3wGJLJQCmKGrLrMiYhT9AUS7Vda/F3RvD4KmC5ftundPvZ1MwYMlnLdNFjex2Q2SSJHTkY371SqazQWJZYr8El+RFY5CNTaDdDWfwZ7/E1YyFQS2tQOffu/7DPhSo8CYF34Gfxc7gw50yDH8FRoVlKPNTtMfZpJUh1nsHetm95fvTF1QCupbSmGaHxow4EggOpVQVZwGwVYm//ST/UjLvQWqfiIWztLHum6HwNhjw1uPfL40NY+OXS3vPNSUqbpBfuOyWGSmSLIx/EO5/CV77V4CRgOlpukqPQaKk2O8YI3cwF/1yirrpH9ZGyLM0Wvt5EcDJutfyYCsj9d2jOh6zyp52D0PdiDk7wt4OBrQae4NUKpFpvsWcrKnraxDd2y9FaEy56xhit6u9ayCGVP4ZKzyEoK95dGKF60wrmu6yoLCw4ckHmqlyfXB86ns0Yo3oQBLxW+Q3zxAHkXt3eGfj2wQ133oe1M2gOLSridg4wxZL7C2Q9OzwvrPNOeFyttDWichgQq+gRbhHw2/E10vZ47qQBxhZhQBl0VSHhgugN6Cu8jAbXhbsRiDedCieBD7PdlFvIOCJHaO+rROwoSHm38Zz8DzN/aBrXKFqFwy/dwChzLsO+/UI9SzvuanMfKr8Lctqu2mvqLMDVACTdHzM4fe42v+PuilZVvxdyOrtfGmd1kf6TcbfY1LKsUAuctg/1X4L4X4K8N6h/428oq0ov61GSqwsEIjvkJOrfTAoLwO4Zrg8Liyrbi+bD9Rxsrm+9sFsiG8u2+5vK8V60Rstddrj8Qtl+A487D3xPYPmjzpTIYCKgfoXd8y2o/E8mYS1JAX6YnyqFk071pAQb+JF+OJyOpLuQ5TA6aR8lPwaVhU+TiSFzXKzZCZ9zNd5gjQp8XN9rLM/l9NhqwoOP8p3Sg8m5hxRhLYZsFwJqGoziu7ILSDtdRhm2/IhBR+kgBFkoTkFBmOPcKdN7JRbzNy6nscgOCC6WEk5Rn5T+LA0tut0bI9b4AqyS8YS/XZ8a1oavvCRE7PNgPnohiWjv6B16vJFxOBwVH90tJo72FudFXMKnrUqFVjEMKHOyzdNfkLthBcF0utJkqdEq1cB8yf7DvfLVvjVX0q2OJlQe1GDtruaBTIknCS5fDOOrTJZbiS2/XdwALVsV0C+exhcsex1EdwS1MjSAGLL5NVbDdRLVDIZGOXRCKJgFYKK0vYjukAgsXLPT43WGhQjjuEhw/RxrrZwiV5rTVHyIJNOs1qNhmLXFBuBrHs3ungm2fIfDKXZYRIhQ6LNgtOLdOlx8FFeU4djzoDBkoPdDuQHUL1T+o67BzY+dzzQ0fCGDxEjOdqFP9lR28A0u+GlUsqXamN2CVQMJW+HsIq2Pwqy2wLNw9D8M1fsDEr0LVlA4skj1pk2gsHzdPbnO9BxUW9HfBS/2hBhxKt/WDiPMZVEEbG/Ks2UXPJxMXIcYP1KYsmoEdqIJgAWCVgY3wfuXAkPZENYtULEbJxdktyo7QmafA//8TqjsOYMG5v8PffY5Ks4m8AgvsE9LJgazwCiwO7Ad8Inw8AAtX9kTyBu8FgJklBVjwzPnCZ0YJ5W57y56Bfac5qSg7gwMCkjoeG0tyM0KIGclRj0DCqfIQgaJK7FHv1T+XkfglYLbyQHJllesataMA5ywvkargxe+rSwCJFa4TwYePkKdwHU4xkScF/kAbhuvMBGSXv2eZ290lluwMHLusukYqxvsKLEcnx/flDVhwjyLo2F/7AixP5AUCi1cxE4jdBmygBPJik/CZxaQn2n/WSNlrcK/lpA2gVoM9lxRERh0WlEaUAOCt9us8MqFkhQ9+Dmn8GqARqXDCEWVSFiEbiaoaGul1oQqWR8inot0kVLHEJZZsF6qrXtUrH4GFdi1cOwe2leIAVxtVUNzukuWiGnuaJzSCJdDqFzdl5XtXYMGoeflsrIcJiXVQcLRFOl0oaXDultDnAmxbLKHKXfwwgQAW+rKgo5YjmIXhWqISK0IRh9cqd6G3q0HqohlIUQVrngfUXlCFQaqAHac4Wxtg0abp2CJkw4nE08qeCKKgriQWRE/Q5oL5ssh4IAqOnpx/SSY63Zr3ydhxZZZAAQvpcVT9QK0rJBS5iw9NDFho58H2Y2jbgaR71UGo4F8YEPrB9nPlkbJR/gCLl86DeelZ5S+w0JkOxxSjI9yhgXASUb4BJVZxoNYwCxbay1e87DZlRasosPuSWSkABdU7AhpWLrpmMACiN+fvaaimkBeX4VnOuNXIGn+NwI/1O7//B+5/4jAuBQnhtqaXJwdxKee0Psa7Ao5DG7IcvyESY4/QFvQVWNwMbLmZJx3EbKyf3J9ZnlkNTvDVlXEDxlXelbGRdxJfg7Yag72/rsHFzQf7jgCMle/1GvJSB+VEX5BYwPp5mrpPwAfHuEpT0tGQMaTUElb+iJO6KdwPpAiqdFa2oUpsEibaUGjoizFpaP8BmzeiLEK+lreNMPtvpFv0PwlPAmKCX++spk3yR7At31NyMiIwsY1CMoUjo4A9FHneclY2RHgsOv151W+jlYszXY4DlP0mZvf+D6RBYjROGjwkAAAAAElFTkSuQmCC';
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Dan Eggar';
  workbook.lastModifiedBy = 'Dan Eggar';
  workbook.created = new Date(2022, 4, 1);
  workbook.modified = new Date();
  workbook.lastPrinted = new Date(2022, 4, 3);

  // add image to workbook by base64
  const imageId2 = workbook.addImage({
    base64: logo,
    extension: 'png'
  });

  // add image to workbook by filename
  //   const imageId1 = workbook.addImage({
  //     filename: logo,
  //     extension: 'png'
  //   });

  // add image to workbook by buffer
  //   const imageId2 = workbook.addImage({
  //     buffer: fs.readFileSync('/ambys-color-logo.png'),
  //     extension: 'png'
  //   });

  const worksheet = workbook.addWorksheet('Sheet', {
    views: [{ state: 'frozen', ySplit: 4 }]
  });

  //
  worksheet.mergeCells('A1:O4');
  worksheet.getCell(
    'A1'
  ).value = `${theSpecies} ${theStrain} Shipping Manifest`;
  worksheet.getCell('A1').alignment = {
    vertical: 'middle',
    horizontal: 'center'
  };
  worksheet.getCell('A1').font = {
    name: 'Calibri (Body)',
    size: 18,
    bold: true,
    underline: false
  };

  // insert an image over B2:D6
  worksheet.addImage(imageId2, 'M1:O3');

  var headerRow = worksheet.getRow(5);
  //   headerRow.height = 69;

  const colHeadings = [
    { label: 'Crate', width: 6, color: '' },
    { label: 'Animal ID', width: 10, color: '' },
    { label: 'Cage ID', width: 6, color: '' },
    { label: 'Ear ID', width: 10, color: '' },
    { label: 'RFID', width: 15, color: '' },
    { label: 'Envigo ID', width: 10, color: '' },
    { label: 'Sex', width: 10, color: '' },
    { label: 'Birth Date', width: 12, color: '' },
    { label: 'Dame', width: 15, color: '' },
    { label: 'Sire', width: 15, color: '' },
    { label: 'Genotype', width: 20, color: '' },
    { label: 'BW', width: 8, color: '' },
    { label: 'Cloudy eyes', width: 8, color: '' },
    { label: 'Study ID', width: 15, color: 'D0CECE' },
    { label: 'Group', width: 6, color: 'FFFF00' }
  ];

  for (let i = 0; i < colHeadings.length; i++) {
    const theCell = headerRow.getCell(i + 1);
    theCell.value = colHeadings[i].label;
    theCell.alignment = {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: true
    };
    theCell.font = {
      name: 'Calibri (Body)',
      size: 11,
      bold: true
    };
    theCell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    worksheet.getColumn(i + 1).width = colHeadings[i].width;
    if (colHeadings[i].color != '') {
      theCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: colHeadings[i].color }
      };
    }
  }
  //ws_data
  for (let i = 0; i < ws_data.length; i++) {
    const row = worksheet.getRow(6 + i);
    row.values = ws_data[i];
    row.alignment = {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: true
    };
  }

  const fileName = `Ambys Shipping Manifest_${theStudy}`;

  console.log(worksheet);

  //
  workbook.xlsx
    .writeBuffer()
    .then((buffer) => {
      console.log('file created');
      const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const fileExtension = '.xlsx';

      const blob = new Blob([buffer], { type: fileType });

      saveAs(blob, fileName + fileExtension);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export default ExportRoster;
